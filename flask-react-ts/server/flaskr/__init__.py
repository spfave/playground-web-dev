from flask import Flask
from flaskr.config import Config


def create_app(config_class=Config):
    # Create and configure server app
    app = Flask(__name__)
    app.config.from_object(Config)

    @app.route('/hello')
    def hello():
        return 'Hello, World!'

    return app
