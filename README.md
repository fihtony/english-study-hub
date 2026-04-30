# English Study Hub

A Flask landing page for the English Study Hub application, built with Python 3.12, Flask, and Tailwind CSS.

## Overview

English Study Hub is a web application designed to help users improve their English language skills through an interactive learning interface. This repository contains the Flask backend and landing page implementation.

## Tech Stack

- **Python**: 3.12
- **Backend Framework**: Flask 3.0+
- **Styling**: Tailwind CSS
- **Testing**: pytest
- **Frontend**: HTML5, CSS3, Responsive Design

## Design Reference

The landing page design is based on the Google Stitch design system:
- **Project**: https://stitch.withgoogle.com/projects/13629074018280446337?pli=1
- **Screen ID**: 45ac4478a1b7455f861d7377f92105e6
- **Design Name**: Landing Page (Bare-bones)

The implementation follows the design specifications for layout, typography, colors, spacing, and responsive behavior.

## Project Structure

```
english-study-hub/
├── app/
│   ├── __init__.py          # Flask app initialization
│   └── templates/
│       └── index.html       # Landing page template
├── static/
│   └── css/
│       └── style.css        # Custom CSS styling
├── tests/
│   ├── __init__.py          # Test package
│   └── test_landing.py      # Landing page integration tests
├── run.py                   # Development server entry point
├── requirements.txt         # Python dependencies
├── .gitignore              # Git ignore rules
└── README.md               # This file
```

## Setup

### Prerequisites

- Python 3.12 or later
- pip (Python package manager)
- Virtual environment (venv)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/fihtony/english-study-hub.git
   cd english-study-hub
   ```

2. **Create and activate a virtual environment**:
   
   On macOS/Linux:
   ```bash
   python3.12 -m venv venv
   source venv/bin/activate
   ```
   
   On Windows:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

Start the Flask development server:

```bash
python run.py
```

The application will be available at:
- **Local**: http://localhost:5000
- **Network**: http://<your-ip>:5000

The development server automatically reloads on code changes.

### Environment Variables

- `PORT`: Server port (default: 5000)
- `FLASK_ENV`: Environment mode (development/production)

Example:
```bash
PORT=8000 python run.py
```

## Testing

### Run All Tests

```bash
pytest
```

### Run Tests with Verbose Output

```bash
pytest -v
```

### Run Specific Test File

```bash
pytest tests/test_landing.py
```

### Test Coverage

Tests cover:
- HTTP status codes (200 OK for GET /)
- HTML structure and semantic elements
- Responsive design at key breakpoints
- CSS styling and Tailwind classes
- Page rendering without errors
- Design compliance with Stitch specifications

## Responsive Design

The landing page is designed to be responsive across all device sizes:

- **Mobile**: 375px and up
- **Tablet**: 768px and up
- **Desktop**: 1280px and up

Breakpoints are implemented using Tailwind CSS responsive prefixes:
- `sm:` - Small devices (640px+)
- `md:` - Medium devices (768px+)
- `lg:` - Large devices (1024px+)
- `xl:` - Extra large devices (1280px+)

Test responsive behavior using browser DevTools or by resizing the window to the target viewport sizes.

## Development Workflow

1. **Make changes** to templates in `app/templates/` or styles in `static/css/`
2. **Test locally** by refreshing http://localhost:5000
3. **Run tests** to ensure no regressions: `pytest`
4. **Commit changes** with clear messages
5. **Push to feature branch** for review

## Code Quality

### Linting

Python code follows PEP 8 standards. Run a linter before committing:

```bash
pip install flake8
flake8 app/ tests/
```

### Type Hints

Code uses optional type hints for clarity. Examples:

```python
from flask import Flask, render_template

app: Flask = Flask(__name__)

def get_landing_page() -> str:
    return render_template('index.html')
```

## Browser Support

The landing page is tested and compatible with:
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 5+)

## Deployment

### Production Build

1. Set environment variables:
   ```bash
   export FLASK_ENV=production
   ```

2. Use a production WSGI server (e.g., Gunicorn):
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 run:app
   ```

3. Configure a reverse proxy (nginx/Apache) for static files and SSL termination.

## Troubleshooting

### Port Already in Use

If port 5000 is busy, use a different port:

```bash
PORT=5001 python run.py
```

### Module Not Found Errors

Ensure the virtual environment is activated and dependencies are installed:

```bash
source venv/bin/activate
pip install -r requirements.txt
```

### Tests Failing

Run tests in verbose mode to see detailed error messages:

```bash
pytest -v --tb=short
```

## Contributing

1. Create a feature branch: `git checkout -b feature/CSTL-XXX`
2. Make changes and test thoroughly
3. Run the full test suite: `pytest`
4. Commit with clear messages
5. Push and create a pull request

## License

Copyright © 2026. All rights reserved.

## Support

For issues, questions, or feature requests, please open an issue on GitHub or contact the development team.