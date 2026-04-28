import os
import logging
import secrets
from typing import Optional, Mapping, Any, Union

from flask import Flask, Blueprint, render_template, jsonify, request
from jinja2 import TemplateNotFound

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)


def _resolve_template_folder() -> str:
    return os.path.join(os.path.dirname(__file__), "templates")


def _resolve_static_folder() -> str:
    # static/ lives at project root, one level above app/
    return os.path.join(os.path.dirname(__file__), "..", "static")


def _generate_secret_key() -> str:
    return secrets.token_urlsafe(32)


def _safe_render(app: Flask, template_name: str, **context: Any):
    try:
        return render_template(template_name, **context)
    except TemplateNotFound:
        # Fallback: return a minimal HTML response if template is missing
        if request.accept_mimetypes.accept_json and not request.accept_mimetypes.accept_html:
            return jsonify({"error": "not found", "template": template_name}), 404
        html = f"""<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>{context.get('title', '')}</title></head>
<body>
<h1>{context.get('title', 'English Study Hub')}</h1>
<p>Landing page placeholder. Create templates/{template_name} for full content.</p>
</body>
</html>"""
        return html, 200 if template_name != "404.html" else (html, 404)


def create_app(config: Optional[Union[str, Mapping[str, Any]]] = None) -> Flask:
    """
    Application factory.

    - template_folder points to app/templates
    - static_folder points to project-root/static (one level above app/)
    - config may be:
      * None - use defaults
      * mapping/dict - update app.config from it
      * string - import config object path for app.config.from_object
    """
    template_folder = _resolve_template_folder()
    static_folder = _resolve_static_folder()

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Basic, secure defaults
    app.config.setdefault("JSONIFY_PRETTYPRINT_REGULAR", False)
    # Prefer explicit SECRET_KEY from environment or provided config; otherwise generate ephemeral key
    env_secret = os.environ.get("SECRET_KEY")
    if env_secret:
        app.config.setdefault("SECRET_KEY", env_secret)
    else:
        app.config.setdefault("SECRET_KEY", _generate_secret_key())
        logger.warning("No SECRET_KEY in environment; generated ephemeral key for development/testing.")

    # Apply user-provided config
    if config is not None:
        if isinstance(config, Mapping):
            app.config.update(config)  # type: ignore[arg-type]
        elif isinstance(config, str):
            try:
                app.config.from_object(config)
            except Exception as exc:
                logger.exception("Failed to load config from object path '%s': %s", config, exc)
                raise

    # Register routes/blueprints from app.routes if available
    try:
        # Import inside factory to avoid circular imports and to allow testing to patch module
        import app.routes as routes_mod  # type: ignore

        registered = False
        # Common blueprint names
        for attr in ("bp", "blueprint", "routes_bp"):
            if hasattr(routes_mod, attr):
                attr_obj = getattr(routes_mod, attr)
                if isinstance(attr_obj, Blueprint):
                    app.register_blueprint(attr_obj)
                    registered = True
                    logger.info("Registered blueprint '%s' from app.routes.%s", attr_obj.name, attr)
                    break

        if not registered:
            # Check for factory/init functions
            if hasattr(routes_mod, "init_app") and callable(getattr(routes_mod, "init_app")):
                try:
                    routes_mod.init_app(app)
                    registered = True
                    logger.info("Registered routes via app.routes.init_app(app)")
                except Exception:
                    logger.exception("app.routes.init_app(app) failed")
                    raise
            elif hasattr(routes_mod, "register_routes") and callable(getattr(routes_mod, "register_routes")):
                try:
                    routes_mod.register_routes(app)
                    registered = True
                    logger.info("Registered routes via app.routes.register_routes(app)")
                except Exception:
                    logger.exception("app.routes.register_routes(app) failed")
                    raise
            elif hasattr(routes_mod, "create_blueprint") and callable(getattr(routes_mod, "create_blueprint")):
                try:
                    bp = routes_mod.create_blueprint()
                    if isinstance(bp, Blueprint):
                        app.register_blueprint(bp)
                        registered = True
                        logger.info("Registered blueprint returned by app.routes.create_blueprint()")
                except Exception:
                    logger.exception("app.routes.create_blueprint() failed")
                    raise

        if not registered:
            # As a last resort, if module defines functions named route_*, attach them as endpoints
            if hasattr(routes_mod, "index") and callable(getattr(routes_mod, "index")):
                app.add_url_rule("/", "index", routes_mod.index, methods=["GET"])
                registered = True
                logger.info("Registered app.routes.index as '/' route")
    except ModuleNotFoundError:
        logger.info("app.routes not found; registering fallback routes.")
    except Exception:
        # If any other failure occurred while importing/registering, re-raise to make failures obvious
        logger.exception("Error while importing or registering routes from app.routes")
        raise

    # If no route registered for '/', add a minimal route that attempts to render templates/index.html
    if not any(rule.rule == "/" for rule in app.url_map.iter_rules()):
        @app.get("/")
        def _index():
            return _safe_render(app, "index.html", title="English Study Hub")

    # Error handlers
    @app.errorhandler(404)
    def _handle_404(err):
        try:
            return _safe_render(app, "404.html", title="Not Found")
        except Exception:
            logger.exception("Error while handling 404")
            return jsonify({"error": "not found"}), 404

    @app.errorhandler(500)
    def _handle_500(err):
        logger.exception("Unhandled server error: %s", err)
        try:
            return _safe_render(app, "500.html", title="Server Error")
        except Exception:
            return jsonify({"error": "server error"}), 500

    # Security-related headers (basic)
    @app.after_request
    def _set_security_headers(response):
        response.headers.setdefault("X-Content-Type-Options", "nosniff")
        response.headers.setdefault("X-Frame-Options", "SAMEORIGIN")
        response.headers.setdefault("Referrer-Policy", "no-referrer-when-downgrade")
        response.headers.setdefault("X-XSS-Protection", "1; mode=block")
        # Content-Security-Policy kept conservative to avoid breaking valid assets; projects should extend it in production
        response.headers.setdefault("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:;")
        return response

    return app


__all__ = ["create_app"]