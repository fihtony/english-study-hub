import os
import logging
import importlib
from typing import Optional, Mapping, Any

from flask import Flask
from flask.blueprints import Blueprint

__all__ = ["create_app"]


def _is_testing_flag(config_name: Optional[Any]) -> bool:
    if config_name == "testing":
        return True
    if isinstance(config_name, Mapping):
        return bool(config_name.get("TESTING"))
    return False


def _safe_register_blueprint(app: Flask, bp: Blueprint) -> None:
    """
    Register a blueprint with error handling so a broken blueprint doesn't
    interrupt application creation.
    """
    try:
        app.register_blueprint(bp)
    except Exception:
        app.logger.exception("Failed to register blueprint %r", getattr(bp, "name", bp))


def _register_routes_module(app: Flask, module_name: str = "app.routes") -> None:
    """
    Import app.routes lazily and register any blueprints or call registration helpers.
    This avoids import-time side effects when this package is imported.
    """
    try:
        routes_mod = importlib.import_module(module_name)
    except Exception:
        logging.exception("Could not import routes module %s", module_name)
        return

    # Preferred explicit hooks
    try:
        if hasattr(routes_mod, "register_blueprints") and callable(routes_mod.register_blueprints):
            routes_mod.register_blueprints(app)  # type: ignore[call-arg]
            return

        # support simple init_app(app) pattern
        if hasattr(routes_mod, "init_app") and callable(routes_mod.init_app):
            routes_mod.init_app(app)  # type: ignore[call-arg]
            return

        # support a single Blueprint named `bp`
        if hasattr(routes_mod, "bp") and isinstance(getattr(routes_mod, "bp"), Blueprint):
            _safe_register_blueprint(app, routes_mod.bp)  # type: ignore[arg-type]
            return

        # If the module exposes a list `blueprints`, register them
        if hasattr(routes_mod, "blueprints"):
            for candidate in getattr(routes_mod, "blueprints"):
                if isinstance(candidate, Blueprint):
                    _safe_register_blueprint(app, candidate)
            return
    except Exception:
        app.logger.exception("Exception while registering routes from module %s", module_name)
        return


def create_app(config_name: Optional[Any] = None) -> Flask:
    """
    Application factory. Creates and configures the Flask app.

    - Uses package-relative template and static folders so tests and different
      working directories resolve assets correctly.
    - Accepts a config name (string) or a mapping for configuration.
    - Keeps route-registration resilient to failures in the routes module.
    """
    pkg_dir = os.path.dirname(__file__)

    template_folder = os.path.join(pkg_dir, "templates")
    static_folder = os.path.join(pkg_dir, "static")

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
        static_url_path="/static",
    )

    # Basic default config; callers can override by passing config_name
    app.config.setdefault("SECRET_KEY", "dev-secret-for-local")

    # Apply configuration passed in. Support Mapping or string flag for 'testing'.
    if config_name is None:
        # default development-ish configuration; keep TESTING as False unless asked
        pass
    elif isinstance(config_name, Mapping):
        app.config.update(config_name)
    else:
        # string-based config: try to import app.configs.<name> or set testing flag
        if _is_testing_flag(config_name):
            app.config["TESTING"] = True
        else:
            # best-effort: try to import app.configs.<config_name> and apply
            try:
                cfg_mod = importlib.import_module(f"app.configs.{config_name}")
                # module may provide configure_app or be a simple object
                if hasattr(cfg_mod, "configure_app") and callable(cfg_mod.configure_app):
                    cfg_mod.configure_app(app)  # type: ignore[call-arg]
                else:
                    # attempt to load attributes as config object
                    try:
                        app.config.from_object(cfg_mod)
                    except Exception:
                        app.logger.exception("Failed to load config object from module %s", cfg_mod)
            except Exception:
                app.logger.debug("No config module app.configs.%s, continuing", config_name)

    # Ensure logging is available during app creation
    try:
        _register_routes_module(app)
    except Exception:
        app.logger.exception("Failed while registering routes")

    return app
