import importlib
import flask
from types import ModuleType


def test_importing_app_package_creates_no_top_level_app_variable():
    """
    Import the 'app' package and assert that it does not create a top-level
    variable named 'app'. Packages must be side-effect free on import.
    """
    mod: ModuleType = importlib.import_module("app")
    assert not hasattr(mod, "app"), (
        "Importing the 'app' package created a top-level 'app' variable. "
        "The application must use a factory (create_app) and avoid module-level "
        "Flask app instances."
    )


def test_create_app_returns_flask_instance_and_does_not_mutate_package():
    """
    Import create_app from the package, call it, and assert the returned object
    is a flask.Flask instance. Also verify that calling the factory does not
    introduce a module-level 'app' attribute on the package.
    """
    # Import factory (this will import the package but should be side-effect free)
    from app import create_app  # noqa: E402

    app_instance = create_app()
    assert isinstance(app_instance, flask.Flask), "create_app() did not return a Flask instance"

    # Re-check package for accidental top-level 'app' attribute after factory call
    mod: ModuleType = importlib.import_module("app")
    assert not hasattr(mod, "app"), (
        "Calling create_app() caused a top-level 'app' attribute to be set on the package. "
        "Factories must not mutate package globals."
    )