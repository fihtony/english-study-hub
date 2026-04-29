import os
import logging
from typing import Optional, Mapping, Any

from flask import Flask, request, jsonify, render_template, make_response


def create_app(config_overrides: Optional[Mapping[str, Any]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - Uses project-mandated template and static folder locations so templates and
      /static/... resolve correctly regardless of working directory.
    - Loads a minimal secure-by-default configuration and applies any overrides.
    - Registers the blueprint defined in app.routes (searched flexibly for common names).
    - Installs security headers and sensible error handlers.

    This function is safe to import (no side-effects at module import time).
    """
    # Resolve required folders relative to this file
    pkg_dir = os.path.dirname(__file__)
    template_folder = os.path.join(pkg_dir, "templates")
    static_folder = os.path.join(pkg_dir, "..", "static")  # project-root static/

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Default config: keep secure defaults but allow overrides (including TESTING)
    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "dev-secret-change-me"),  # override in prod
        TESTING=False,
        PREFERRED_URL_SCHEME="https",
        SESSION_COOKIE_SECURE=True,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE="Lax",
    )

    # Apply any provided overrides (useful for tests or runtime env)
    if config_overrides:
        app.config.update(config_overrides)

    # Configure logging if not already configured by the hosting environment
    if not app.logger.handlers:
        handler = logging.StreamHandler()
        handler.setLevel(logging.DEBUG if app.debug or app.testing else logging.INFO)
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        app.logger.addHandler(handler)
        app.logger.setLevel(handler.level)

    # Register routes blueprint from app.routes.
    # Import inside factory to avoid side-effects at module import time.
    try:
        from . import routes as routes_module
    except Exception as exc:  # pragma: no cover - import-time issues should surface
        app.logger.exception("Failed importing app.routes: %s", exc)
        raise

    # Support a few common blueprint attribute names to be flexible in tests/dev
    blueprint_candidate_names = ("bp", "main_bp", "blueprint", "main")
    blueprint = None
    for name in blueprint_candidate_names:
        if hasattr(routes_module, name):
            blueprint = getattr(routes_module, name)
            break

    if blueprint is None:
        # As a last resort, if routes_module defines a register_routes function,
        # call it to let it register directly on this app.
        if hasattr(routes_module, "register_routes") and callable(
            getattr(routes_module, "register_routes")
        ):
            try:
                routes_module.register_routes(app)
            except Exception as exc:
                app.logger.exception("routes.register_routes raised an exception: %s", exc)
                raise
        else:
            raise RuntimeError(
                "app.routes must expose a Blueprint (bp / main_bp / blueprint / main) "
                "or a callable register_routes(app)."
            )
    else:
        app.register_blueprint(blueprint)

    # Security headers applied to every response
    @app.after_request
    def set_security_headers(response):
        # Basic, recommended security headers
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "DENY")
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        # X-XSS-Protection is legacy but harmless; CSP provides stronger protection
        response.headers.setdefault("X-XSS-Protection", "1; mode=block")
        # Content Security Policy: conservative defaults allow only same-origin resources.
        # Inline styles are allowed to support minimal styling; tighten in prod if using CSP nonce/hash.
        response.headers.setdefault(
            "Content-Security-Policy",
            "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;",
        )
        return response

    # Error handlers with safe fallbacks (templates optional)
    @app.errorhandler(404)
    def handle_404(e):
        # Prefer JSON if caller prefers it, useful for API/testing.
        if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
            return jsonify({"error": "not_found"}), 404
        try:
            return make_response(render_template("404.html"), 404)
        except Exception:
            return make_response("<h1>404 Not Found</h1>", 404)

    @app.errorhandler(500)
    def handle_500(e):
        app.logger.exception("Unhandled exception: %s", e)
        if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
            return jsonify({"error": "internal_server_error"}), 500
        try:
            return make_response(render_template("500.html"), 500)
        except Exception:
            return make_response("<h1>Internal Server Error</h1>", 500)

    return app