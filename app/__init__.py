import os
from flask import Flask

def create_app():
    app = Flask(
        __name__,
        template_folder=os.path.join(os.path.dirname(__file__), 'templates'),
        static_folder=os.path.join(os.path.dirname(__file__), '..', 'static')
    )
    
    app.config['DEBUG'] = True
    
    from app import routes
    app.register_blueprint(routes.bp)
    
    return app
