import os
from typing import Optional, Mapping, Any

from flask import Flask, Blueprint


def create_app(config: Optional[object] = None, **kwargs) -> Flask:
    """
    Application factory.

    - Instantiates Flask with templates resolved relative to this package using
      template_folder=os.path.join(os.path.dirname(__file__), 'templates')
    - Accepts a mapping (dict-like) or None for `config`. Passing anything else
      raises TypeError to make misuse explicit.
    - Additional keyword args are applied via from_mapping.
    - Registers any Blueprint instances defined in app.routes.
    """
    # package-relative dirs
    pkg_dir = os.path.dirname(__file__)
    templates_dir = os.path.join(pkg_dir, "templates")
    static_dir = os.path.join(pkg_dir, "static")

    # Instantiate Flask with explicit template folder (required by project rules)
    app = Flask(
        __name__,
        template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
        static_folder=static_dir,
        static_url_path="/static",
    )

    # Secure defaults (can be overridden by provided config)
    app.config.setdefault("SECRET_KEY", os.environ.get("SECRET_KEY", "dev-secret"))
    app.config.setdefault("SESSION_COOKIE_HTTPONLY", True)
    app.config.setdefault("SESSION_COOKIE_SAMESITE", "Lax")

    # Configuration handling
    if config is not None:
        # Accept only mapping/dict-like objects here. Strings (module names) or
        # other objects are rejected to avoid accidental import_string usage.
        if isinstance(config, Mapping):
            app.config.from_mapping(config)  # type: ignore[arg-type]
        else:
            raise TypeError("create_app() expected a mapping for `config` (or None); got %r" % (type(config).__name__,))

    # Apply any extra keyword config values
    if kwargs:
        app.config.from_mapping(kwargs)

    # Register blueprints exported by app.routes
    try:
        import importlib

        routes_mod = importlib.import_module("app.routes")
    except Exception as exc:
        raise RuntimeError("Failed to import app.routes for blueprint registration") from exc

    # Find Blueprint instances and register them
    registered = False
    for attr_name in dir(routes_mod):
        attr = getattr(routes_mod, attr_name)
        if isinstance(attr, Blueprint):
            app.register_blueprint(attr)
            registered = True

    if not registered:
        # Non-fatal in some projects, but tests expect a route; raise to be explicit
        raise RuntimeError("No Blueprints found in app.routes to register")

    return app
