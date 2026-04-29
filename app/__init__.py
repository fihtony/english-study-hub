import os
import logging
from typing import Optional, Union, Mapping, Any
from flask import Flask

__all__ = ("create_app",)

def _get_package_paths() -> tuple[str, str]:
    """
    Return (templates_dir, static_folder) for the app package.
    static_folder is one level above the package directory, pointing to project-root/static.
    """
    package_dir = os.path.dirname(__file__)
    templates = os.path.join(package_dir, "templates")
    static_folder = os.path.normpath(os.path.join(package_dir, "..", "static"))
    return templates, static_folder

def create_app(config: Optional[Union[Mapping[str, Any], str, object]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - config may be:
      * a dict-like mapping which will be applied via app.config.update(...)
      * a string path to a Python file which will be loaded via app.config.from_pyfile(...)
      * an object (module/class) usable by app.config.from_object(...)
    - The function is import-safe and performs no side-effects on import.
    """
    templates, static_folder = _get_package_paths()
    app = Flask(__name__, template_folder=templates, static_folder=static_folder)

    # Default security-conscious configuration (sane defaults for both dev and prod).
    # SECRET_KEY should be overridden in production via environment variable or config.
    is_production = os.environ.get("FLASK_ENV", "").lower() == "production" or os.environ.get("ENV", "").lower() == "production"

    app.config.from_mapping(
        SECRET_KEY=os.environ.get("SECRET_KEY", "please-change-this-secret-key"),
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE=os.environ.get("SESSION_COOKIE_SAMESITE", "Lax"),
        SESSION_COOKIE_SECURE=(os.environ.get("SESSION_COOKIE_SECURE") == "1") or is_production,
        PREFERRED_URL_SCHEME="https" if is_production else "http",
    )

    # Merge provided config into app config with robust handling
    if config:
        try:
            if isinstance(config, Mapping):
                app.config.update(config)  # type: ignore[arg-type]
            elif isinstance(config, str):
                # treat as path to config file
                if os.path.exists(config):
                    app.config.from_pyfile(config)
                else:
                    # attempt to import by module path
                    app.config.from_object(config)
            else:
                # object-like (module/class)
                app.config.from_object(config)
        except Exception as exc:
            # Fail fast but keep clear error so callers/tests can diagnose
            raise RuntimeError(f"Failed to apply configuration to Flask app: {exc}") from exc

    # Configure logging (do not attach file handlers by default)
    if not app.debug and not app.testing:
        # In production, ensure at least WARNING level is captured
        log_level = logging.INFO if is_production else logging.WARNING
    else:
        log_level = logging.DEBUG
    logging.basicConfig(level=log_level)
    app.logger.setLevel(log_level)

    # Register blueprints and routes. Import inside factory to avoid import-time side-effects.
    try:
        from .routes import main_bp  # local import
    except Exception as exc:
        # Provide a clear message if routes cannot be imported (useful in tests and CI)
        raise RuntimeError(f"Failed to import application routes: {exc}") from exc

    app.register_blueprint(main_bp)

    # Simple error handlers that return safe, minimal responses.
    @app.errorhandler(404)
    def _handle_404(err):
        # Prefer rendering a template if available; fall back to a safe text response.
        try:
            from flask import render_template
            return render_template("404.html"), 404
        except Exception:
            return "Not Found", 404

    @app.errorhandler(500)
    def _handle_500(err):
        app.logger.exception("Unhandled exception: %s", err)
        try:
            from flask import render_template
            return render_template("500.html"), 500
        except Exception:
            return "Internal Server Error", 500

    return app