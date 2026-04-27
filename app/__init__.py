"""Flask application factory for the English Study Hub.

This module exposes a single function, `create_app`, which constructs and returns
a Flask application instance. Importing this module performs no side-effects.
"""
from __future__ import annotations

import importlib
import logging
import os
from collections.abc import Mapping
from typing import Optional

from flask import Flask, Blueprint

logger = logging.getLogger(__name__)


def create_app(config: dict | None = None) -> Flask:
    """
    Create and configure the Flask application.

    - Uses a template_folder path that resolves relative to this file so templates
      load correctly regardless of the current working directory.
    - If `config` is provided and is a Mapping, its keys are merged into app.config.
    - Attempts to register routes defined in the `app.routes` module. Preferentially:
      - register a Blueprint object named `bp`
      - call a callable `register_routes(app)` if present
      - call a callable `init_app(app)` if present

    Args:
        config: Optional mapping of configuration values to apply to the app.

    Returns:
        A configured Flask application instance.

    Raises:
        TypeError: if config is provided but is not a mapping.
        RuntimeError: if `app.routes` cannot be imported or does not expose
                      a supported registration API.
    """
    # Resolve package locations
    package_dir = os.path.dirname(__file__)
    template_folder = os.path.join(package_dir, "templates")
    # Serve static files from the repository-level `static/` directory (one level up)
    static_folder = os.path.abspath(os.path.join(package_dir, os.pardir, "static"))

    # Construct Flask app with explicit template and static folders resolved
    # relative to this file so templates/static resolve regardless of cwd.
    app = Flask(
        __name__,
        template_folder=template_folder,
        static_folder=static_folder,
        static_url_path="/static",
    )

    # Validate and apply configuration
    if config is not None:
        if not isinstance(config, Mapping):
            raise TypeError("config must be a mapping (dict-like) or None")
        # Use update to avoid replacing Flask defaults unexpectedly
        app.config.update(dict(config))

    # Try to register routes from app.routes in a robust, explicit way.
    try:
        routes_mod = importlib.import_module("app.routes")
    except Exception as exc:  # ImportError or other import-time errors
        # Provide actionable message without causing import-time side-effects.
        logger.exception("Failed to import app.routes")
        raise RuntimeError(
            "Unable to import 'app.routes'. Ensure 'app/routes.py' exists and "
            "exports a Blueprint named 'bp' or a callable 'register_routes(app)' "
            "or 'init_app(app)'."
        ) from exc

    # 1) Blueprint named `bp`
    bp = getattr(routes_mod, "bp", None)
    if isinstance(bp, Blueprint):
        try:
            app.register_blueprint(bp)
            return app
        except Exception as exc:
            logger.exception("Failed to register blueprint 'bp' from app.routes")
            raise RuntimeError("Failed to register blueprint 'bp' from app.routes") from exc

    # 2) Callable register_routes(app)
    register_fn = getattr(routes_mod, "register_routes", None)
    if callable(register_fn):
        try:
            register_fn(app)
            return app
        except Exception as exc:
            logger.exception("app.routes.register_routes raised an exception")
            raise RuntimeError("app.routes.register_routes failed") from exc

    # 3) Callable init_app(app)
    init_fn = getattr(routes_mod, "init_app", None)
    if callable(init_fn):
        try:
            init_fn(app)
            return app
        except Exception as exc:
            logger.exception("app.routes.init_app raised an exception")
            raise RuntimeError("app.routes.init_app failed") from exc

    # If none of the expected registration points are found, fail loudly.
    raise RuntimeError(
        "app.routes does not expose a supported registration API. Provide one of:\n"
        "- a Flask Blueprint object named 'bp'\n"
        "- a callable 'register_routes(app)'\n"
        "- a callable 'init_app(app)'\n"
    )
