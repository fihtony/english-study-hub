# english-study-hub
English Study Hub - a test app from Google Stitch

## Run & Test

Requires Python 3.12.

Run these commands in a POSIX shell to create a virtual environment, install dependencies, run tests, and start the app:

```sh
python3.12 -m venv venv
. venv/bin/activate
pip install -r requirements.txt
pytest -q
python run.py
```

Alternative (Flask CLI):

```sh
FLASK_APP=run.py flask run
```

Notes:
- The project entrypoint is `run.py`.  
- Tests use pytest and the Flask test client (ensure `app.create_app()` or `app` is importable).  
- Ignore the `venv/` directory and `__pycache__/` (add to .gitignore).