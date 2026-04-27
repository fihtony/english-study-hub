#!/usr/bin/env python3
"""
Top-level run script for local development.

This script imports the application factory from the app package,
creates the Flask application, and runs the development server.
"""
from app import create_app

# Create the Flask application using the factory so tests and other tools can import `app`.
app = create_app()

if __name__ == "__main__":
    try:
        # Development server - bind to all interfaces for local testing
        app.run(debug=True, host="0.0.0.0", port=5000)
    except Exception:
        # Minimal error handling to ensure non-zero exit on startup failure
        import logging
        import sys

        logging.exception("Failed to start Flask development server")
        sys.exit(1)