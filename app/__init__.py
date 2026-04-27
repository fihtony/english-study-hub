import os
import logging
from typing import Any, Dict, Optional, Union

from flask import Flask

logger = logging.getLogger(__name__)


def create_app(config: Optional[Union[Dict[str, Any], str, object]] = None) -> Flask:
    """
    Application factory for the Flask app.

    - Creates the Flask app with templates resolved relative to this package.
    - Loads optional configuration (dict, importable object, or path to a .py config file).
    - Registers the `bp` blueprint from app.routes.

    Args:
        config: Optional configuration. May be:
            - dict: applied via app.config.update()
            - str: path to a Python config file (passed to app.config.from_pyfile)
            - object: import path or object passed to app.config.from_object()

    Returns:
        A configured Flask application.
    """
    template_folder = os.path.join(os.path.dirname(__file__), "templates")
    app = Flask(__name__, template_folder=template_folder)

    # Load configuration if provided
    if config is not None:
        try:
            if isinstance(config, dict):
                app.config.update(config)
                logger.debug("Loaded configuration from dict.")
            elif isinstance(config, str):
                # Treat as filesystem path to a Python file
                config_path = os.path.abspath(config)
                if not os.path.exists(config_path):
                    raise FileNotFoundError(f"Config file not found: {config_path}")
                app.config.from_pyfile(config_path)
                logger.debug("Loaded configuration from file: %s", config_path)
            else:
                # For objects (module path string or object), use from_object
                app.config.from_object(config)
                logger.debug("Loaded configuration from object: %r", config)
        except Exception as e:
            logger.exception("Error loading configuration: %s", e)
            raise

    # Register blueprints. Import inside factory to avoid circular imports at module import time.
    try:
        from app.routes import bp  # local import to avoid import-time side effects
    except Exception as e:
        logger.exception("Failed to import blueprint 'bp' from app.routes: %s", e)
        raise ImportError("Could not import blueprint 'bp' from app.routes") from e

    try:
        app.register_blueprint(bp)
        logger.debug("Registered blueprint: %s", getattr(bp, "name", "<unknown>"))
    except Exception as e:
        logger.exception("Failed to register blueprint: %s", e)
        raise

    return app


__all__ = ["create_app"]