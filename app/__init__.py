import os
from typing import Optional
from flask import Flask, jsonify, render_template, request

def _choose_config(config_name: Optional[str]) -> str:
    """
    Resolve the configuration name to use. Priority:
    1. Explicit config_name argument
    2. FLASK_CONFIG environment variable
    3. FLASK_DEBUG environment variable -> 'development' when set to '1'
    4. 'production' fallback
    """
    if config_name:
        return config_name
    env_cfg = os.environ.get("FLASK_CONFIG")
    if env_cfg:
        return env_cfg
    if os.environ.get("FLASK_DEBUG", "") == "1":
        return "development"
    return "production"

class BaseConfig:
    # Replace in production with a secure, unpredictable value via env
    SECRET_KEY = os.environ.get("SECRET_KEY", "please-change-this-secret-key")
    JSON_SORT_KEYS = False
    SESSION_COOKIE_HTTPONLY = True
    REMEMBER_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = "Lax"
    PREFERRED_URL_SCHEME = "https"
    # Disable exposing internal server errors in responses
    PROPAGATE_EXCEPTIONS = False

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = False
    SESSION_COOKIE_SECURE = False

class TestingConfig(BaseConfig):
    DEBUG = False
    TESTING = True
    SESSION_COOKIE_SECURE = False

class ProductionConfig(BaseConfig):
    DEBUG = False
    TESTING = False
    SESSION_COOKIE_SECURE = True
    # HSTS should be enforced by a fronting proxy in many deployments; included here for completeness
    HSTS_SECONDS = 31536000  # 1 year

_CONFIG_MAP = {
    "development": DevelopmentConfig,
    "testing": TestingConfig,
    "production": ProductionConfig,
}

def _register_security_headers(app: Flask) -> None:
    """
    Adds common security headers to responses to mitigate XSS, clickjacking, MIME sniffing, etc.
    Adjust headers as needed by the deployment environment.
    """
    @app.after_request
    def set_security_headers(response):
        # Content Security Policy: restrict to same origin; keep minimal to avoid breaking local static assets.
        csp = "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;"
        response.headers.setdefault("Content-Security-Policy", csp)
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        response.headers.setdefault("X-XSS-Protection", "0")  # modern browsers use CSP; disable legacy filter
        # HSTS in production-like environments
        if not app.debug and app.config.get("SESSION_COOKIE_SECURE", False):
            hsts = f"max-age={app.config.get('HSTS_SECONDS', 0)}; includeSubDomains; preload"
            response.headers.setdefault("Strict-Transport-Security", hsts)
        # Avoid leaking server implementation details
        if "Server" in response.headers:
            del response.headers["Server"]
        return response

def _register_error_handlers(app: Flask) -> None:
    """
    Register minimal error handlers that avoid leaking internal details.
    For HTML requests, render a simple message; for JSON, return structured error JSON.
    """

    def _wants_json() -> bool:
        best = request.accept_mimetypes.best_match(["application/json", "text/html"])
        return best == "application/json" and request.accept_mimetypes["application/json"] >= request.accept_mimetypes["text/html"]

    @app.errorhandler(404)
    def not_found(err):
        if _wants_json():
            return jsonify({"error": "not_found", "message": "The requested resource was not found."}), 404
        # Use a minimal safe HTML response to avoid template issues during errors
        return render_template("index.html"), 404

    @app.errorhandler(500)
    def internal_error(err):
        # Log the exception using Flask's logger (the WSGI server or orchestration should capture logs)
        app.logger.exception("Unhandled exception")
        if _wants_json():
            return jsonify({"error": "internal_server_error", "message": "An internal error occurred."}), 500
        # Return a generic message without exposing internals
        return (
            "<!doctype html><html><head><meta charset='utf-8'><title>Server Error</title></head>"
            "<body><h1>Server Error</h1><p>An internal error occurred. The incident has been logged.</p></body></html>",
            500,
        )

def create_app(config_name: Optional[str] = None) -> Flask:
    """
    Application factory: create and configure the Flask application.

    - Uses template folder at app/templates relative to this file.
    - Uses static folder at ../static relative to this file.
    - Loads one of the predefined config classes or a custom object if provided.
    - Registers the 'main' blueprint from app.routes.
    - Adds security headers and error handlers.
    """
    base_dir = os.path.dirname(__file__)
    template_folder = os.path.join(base_dir, "templates")
    static_folder = os.path.abspath(os.path.join(base_dir, "..", "static"))

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Determine and apply configuration
    chosen = _choose_config(config_name)
    config_obj = _CONFIG_MAP.get(chosen)
    if config_obj is None:
        # Allow direct import strings or module paths via environment (fallback)
        # Try to load by import path if provided; otherwise raise a clear error.
        try:
            app.config.from_envvar(chosen, silent=True)
        except Exception:
            raise RuntimeError(f"Unknown configuration '{chosen}'. Valid options: {', '.join(_CONFIG_MAP)} or a valid env var path.")
    else:
        app.config.from_object(config_obj)

    # Register security headers and error handlers
    _register_security_headers(app)
    _register_error_handlers(app)

    # Register blueprints. Import here to avoid circular imports at module import time.
    try:
        # Expect app.routes to expose a blueprint named 'main'
        from app.routes import main as main_bp  # type: ignore
    except Exception as exc:
        # Provide a clear error to help debugging but do not perform side-effects.
        raise RuntimeError("Failed to import 'main' blueprint from app.routes. Ensure app/routes.py defines a Blueprint named 'main'.") from exc

    app.register_blueprint(main_bp)

    return app