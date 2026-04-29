import os
import logging
from typing import Any, Dict, Optional, Mapping

from flask import Flask

logger = logging.getLogger(__name__)


class BaseConfig:
    """Base configuration with secure sensible defaults."""
    SECRET_KEY: str = os.environ.get("SECRET_KEY", "dev-secret-not-for-prod")
    TESTING: bool = False
    DEBUG: bool = False
    SESSION_COOKIE_HTTPONLY: bool = True
    REMEMBER_COOKIE_HTTPONLY: bool = True
    SESSION_COOKIE_SAMESITE: str = "Lax"
    JSON_SORT_KEYS: bool = False  # preserve insertion order for responses


class DevelopmentConfig(BaseConfig):
    DEBUG = True
    # In development it's acceptable to have a weak secret if explicitly unset.
    SECRET_KEY = os.environ.get("SECRET_KEY", BaseConfig.SECRET_KEY)


class TestingConfig(BaseConfig):
    TESTING = True
    DEBUG = True
    # Use a deterministic secret for tests unless overridden by env.
    SECRET_KEY = os.environ.get("SECRET_KEY", "testing-secret")


class ProductionConfig(BaseConfig):
    DEBUG = False
    # In production, prefer an explicit SECRET_KEY from the environment but do NOT
    # raise at import time (imports must be side-effect free). The presence
    # requirement will be validated when the app is actually created.
    SECRET_KEY = os.environ.get("SECRET_KEY", "")
    SESSION_COOKIE_SECURE = True  # only send cookies over HTTPS in prod


CONFIG_MAPPING: Dict[str, Mapping[str, Any]] = {
    "development": DevelopmentConfig,
    "dev": DevelopmentConfig,
    "testing": TestingConfig,
    "test": TestingConfig,
    "production": ProductionConfig,
    "prod": ProductionConfig,
}


def create_app(config_name: Optional[Any] = None) -> Flask:
    """
    Application factory.

    - If config_name is a dict-like, its keys are merged into app.config.
    - If config_name is a string, a known config mapping is applied (e.g., 'testing').
    - If config_name is None, environment variable FLASK_ENV or 'development' is used.

    This function is safe to call repeatedly and does not start servers.
    """
    # Determine folders according to requirement: ensure templates and static
    # resolve regardless of current working directory.
    here = os.path.dirname(__file__)
    template_folder = os.path.join(here, "templates")
    static_folder = os.path.join(here, "..", "static")

    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
    )

    # Configure logging for the app namespace if not already configured
    if not logger.handlers:
        handler = logging.StreamHandler()
        handler.setFormatter(
            logging.Formatter(
                "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
            )
        )
        logger.addHandler(handler)
        logger.setLevel(logging.INFO)

    # Normalize config_name
    if config_name is None:
        # Prefer FLASK_ENV if available (compatible with older Flask usage)
        config_name = os.environ.get("FLASK_ENV", os.environ.get("ENV", "development"))

    # If a mapping/dict-like config is provided, update config directly
    if isinstance(config_name, Mapping):
        # Copy to avoid mutating caller's dict
        app.config.update(dict(config_name))
        logger.debug("App configured from mapping/dict.")
    elif isinstance(config_name, dict):
        # Accept plain dicts as well (Mapping check above may already catch it,
        # but keep this branch defensive).
        app.config.update(config_name)
        logger.debug("App configured from dict.")
    else:
        # Treat config_name as a string key for known configs
        cfg_name_str = str(config_name).lower()
        cfg_class = CONFIG_MAPPING.get(cfg_name_str)
        if cfg_class is None:
            logger.warning(
                "Unknown config '%s', falling back to development settings.", cfg_name_str
            )
            cfg_class = DevelopmentConfig
        # Load class attributes into app.config
        app.config.from_object(cfg_class)

        # If production was requested, enforce SECRET_KEY presence now (at
        # application creation time) rather than at import time.
        if cfg_class is ProductionConfig:
            if not app.config.get("SECRET_KEY"):
                raise RuntimeError("SECRET_KEY environment variable must be set in production")

    # Ensure testing mode flag is honored
    if app.config.get("TESTING"):
        app.testing = True

    # Register routes. Import inside factory to avoid import-time side effects.
    try:
        from .routes import register_routes

        register_routes(app)
    except Exception:  # intentionally broad to avoid import-time crashes
        # If routes can't be imported/registered, log and re-raise so callers
        # see the error when creating the app.
        logger.exception("Failed to register routes")
        raise

    return app
