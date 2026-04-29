# English Study Hub

A modern web application designed to help English learners improve their reading, writing, and comprehension skills. Built with Flask and Python 3.12.

## Features

- Interactive landing page with responsive design
- Clean, accessible user interface
- Responsive design for mobile, tablet, and desktop
- Modern styling with semantic HTML

## Tech Stack

- **Language**: Python 3.12
- **Backend Framework**: Flask 3.0+
- **Testing**: pytest, pytest-flask
- **Frontend**: HTML5, CSS3, Vanilla JavaScript

## Prerequisites

- Python 3.12 or higher
- pip (Python package installer)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/fihtony/english-study-hub.git
cd english-study-hub
```

2. Create a virtual environment (recommended):
```bash
python3.12 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

## Running the Development Server

Start the Flask development server:
```bash
python run.py
```

The application will be available at `http://localhost:5000`

## Running Tests

Run the test suite:
```bash
pytest
```

For verbose output:
```bash
pytest -v
```

For coverage report:
```bash
pytest --cov=app tests/
```

## Project Structure

```
english-study-hub/
├── run.py                    # Flask development server entry point
├── requirements.txt          # Python package dependencies
├── .gitignore               # Git ignore rules
├── README.md                # This file
├── app/
│   ├── __init__.py          # Flask application factory
│   ├── routes.py            # Route handlers
│   ├── templates/
│   │   ├── base.html        # Base template with common layout
│   │   └── index.html       # Landing page template
│   └── static/
│       ├── css/
│       │   └── style.css    # Styling and responsive design
│       ├── images/          # Images, logos, icons
│       └── js/              # JavaScript files
└── tests/
    └── test_landing_page.py # Integration tests
```

## Design Reference

This project follows the Google Stitch design specification:
- **Project ID**: 13629074018280446337
- **Screen ID**: 45ac4478a1b7455f861d7377f92105e6

The landing page implements the exact layout, color palette, typography, and spacing as defined in the design reference.

## Environment Variables

The application reads the following environment variable:
- `PORT` (optional, defaults to 5000): The port to run the development server on

Example:
```bash
PORT=8080 python run.py
```

## Accessibility

This project is built with accessibility in mind and follows WCAG 2.1 AA standards:
- Semantic HTML5 elements for proper document structure
- Proper heading hierarchy (h1, h2, h3, etc.)
- Alt text for all images
- Keyboard navigation support
- Focus visible states for interactive elements
- Sufficient color contrast ratios

## Responsive Design

The landing page is responsive and adapts to all screen sizes:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Guidelines

- Follow PEP 8 style guidelines for Python code
- Write semantic HTML5
- Use CSS for styling with mobile-first approach
- Ensure all tests pass before committing
- Test across multiple breakpoints and browsers

## Deployment

### Requirements

- Python 3.12 runtime
- pip for package management

### Production Setup

For production deployment:

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Set environment variables:
```bash
export FLASK_ENV=production
export PORT=5000
```

3. Run the application:
```bash
python run.py
```

### Notes

- The application uses dynamic port assignment via the `PORT` environment variable
- The static folder is configured to point to the project-root `static/` directory
- All static assets (CSS, JavaScript, images) are served from the static folder

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Ensure all tests pass: `pytest`
4. Follow PEP 8 style guidelines
5. Commit your changes with clear messages
6. Push to your branch
7. Create a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions, please open an issue on GitHub or contact the development team.

## Related Jira Ticket

- **CSTL-1**: Implement Landing Page (Bare-bones)
- **Sprint**: Sprint 1 - Implement English Reading Website