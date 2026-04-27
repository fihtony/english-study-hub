import logging
import os
import platform
import sys
from typing import Optional, Tuple

# Configure basic logging for visibility when running locally
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()
logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("run")


def _read_host_port() -> Tuple[str, int]:
    """
    Read host and port from environment variables with safe defaults.
    PORT is validated to be an integer within valid TCP port range.
    """
    host = os.environ.get("HOST", "127.0.0.1")
    port_str = os.environ.get("PORT", "5000")
    try:
        port = int(port_str)
        if not (1 <= port <= 65535):
            raise ValueError("port out of range")
    except Exception:
        logger.warning("Invalid PORT value %r, falling back to 5000", port_str)
        port = 5000
    return host, port


def _find_git_dir(start_path: str) -> Optional[str]:
    """
    Search upward from start_path to find a .git directory. Returns its path or None.
    """
    current = os.path.abspath(start_path)
    root = os.path.abspath(os.sep)
    while True:
        candidate = os.path.join(current, ".git")
        if os.path.exists(candidate):
            return candidate
        if current == root:
            return None
        current = os.path.dirname(current)


def _read_git_head_commit(git_dir: str) -> Optional[str]:
    """
    Attempt to read the current commit SHA from a working .git directory.
    Handles HEAD pointing to a ref or containing a detached SHA.
    """
    head_path = os.path.join(git_dir, "HEAD")
    try:
        with open(head_path, "r", encoding="utf-8") as f:
            head = f.read().strip()
        # HEAD may be: "ref: refs/heads/main" or a raw SHA
        if head.startswith("ref:"):
            ref = head.split(":", 1)[1].strip()
            ref_path = os.path.join(git_dir, ref)
            if os.path.exists(ref_path):
                with open(ref_path, "r", encoding="utf-8") as rf:
                    sha = rf.read().strip()
                    if sha:
                        return sha[:40]
            # handle packed-refs fallback
            packed_refs = os.path.join(git_dir, "packed-refs")
            if os.path.exists(packed_refs):
                with open(packed_refs, "r", encoding="utf-8") as pf:
                    for line in pf:
                        line = line.strip()
                        if not line or line.startswith("#") or line.startswith("^"):
                            continue
                        if " " in line:
                            sha, refname = line.split(" ", 1)
                            if refname.strip() == ref:
                                return sha[:40]
        else:
            # HEAD contains SHA directly
            sha = head.split()[0]
            return sha[:40]
    except Exception as exc:
        logger.debug("Could not read git HEAD: %s", exc)
    return None


def _detect_commit_sha() -> Optional[str]:
    """
    Detect commit SHA from environment or .git metadata.
    Checks common CI environment variables before falling back to reading .git.
    """
    env_keys = ("COMMIT_SHA", "GIT_COMMIT", "CI_COMMIT_SHA", "REVISION", "SOURCE_COMMIT")
    for k in env_keys:
        v = os.environ.get(k)
        if v:
            logger.debug("Using commit SHA from environment %s", k)
            return v.strip()[:40]
    # Try to find .git directory relative to this file
    start = os.path.dirname(os.path.abspath(__file__))
    git_dir = _find_git_dir(start)
    if git_dir:
        sha = _read_git_head_commit(git_dir)
        if sha:
            logger.debug("Detected commit SHA from git metadata")
            return sha
    logger.debug("Commit SHA not detected from environment or git metadata")
    return None


def _create_app_instance():
    """
    Import create_app from the app package and instantiate the Flask application.
    Provides clear error messages if the app package is missing or create_app fails.
    """
    try:
        # Import here to provide a clear error message if package is missing
        from app import create_app  # type: ignore
    except Exception as exc:
        logger.exception(
            "Failed to import 'create_app' from package 'app'. Ensure 'app/__init__.py' "
            "defines create_app() and that the package is on PYTHONPATH."
        )
        raise SystemExit(1) from exc

    try:
        app = create_app()
    except Exception as exc:
        logger.exception("create_app() raised an exception during app creation.")
        raise SystemExit(1) from exc

    # Basic runtime sanity checks
    if app is None:
        logger.error("create_app() returned None instead of a Flask application.")
        raise SystemExit(1)

    if not hasattr(app, "run"):
        logger.error("Returned object from create_app() does not appear to be a Flask app.")
        raise SystemExit(1)

    return app


def _print_startup_banner(app_name: Optional[str], host: str, port: int, commit_sha: Optional[str]) -> None:
    """
    Print a concise startup banner to stdout and log basic info.
    """
    lines = [
        "=" * 60,
        f"Starting Flask app: {app_name or '<unknown>'}",
        f"Host: {host}    Port: {port}",
        f"Python: {platform.python_version()}    Platform: {platform.platform()}",
    ]
    if commit_sha:
        lines.append(f"Commit: {commit_sha}")
    lines.append("=" * 60)
    banner = "\n".join(lines)
    # Print to stdout for visibility in CI logs and terminal
    print(banner, flush=True)
    logger.info(banner.replace("\n", " | "))


def main() -> None:
    """
    Entrypoint for running the Flask development server locally.
    Keeps existing host/port parsing; imports create_app from app and starts the server.
    """
    host, port = _read_host_port()

    app = _create_app_instance()

    # Prefer app.debug flag set by app config; fall back to DEBUG env if not present
    try:
        debug_flag = bool(app.debug)
    except Exception:
        debug_env = os.environ.get("DEBUG", os.environ.get("FLASK_DEBUG", "False"))
        debug_flag = str(debug_env).lower() not in ("0", "false", "no", "")

    commit_sha = _detect_commit_sha()

    _print_startup_banner(getattr(app, "name", None), host, port, commit_sha)

    logger.info("Invoking app.run(host=%s, port=%s, debug=%s)", host, port, debug_flag)
    try:
        # As requested: call app.run(host=host, port=port, debug=app.debug)
        # Use the actual app.debug value to preserve application configuration behavior.
        app.run(host=host, port=port, debug=bool(getattr(app, "debug", debug_flag)))
    except Exception as exc:
        logger.exception("Failed to start Flask server.")
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()