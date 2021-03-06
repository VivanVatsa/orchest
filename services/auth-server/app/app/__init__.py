"""Use the Flask application factory pattern.

Additinal note:
    `pytest` requires this __init__.py file to be present for version of
    Python below and including version 3.2.

        https://docs.pytest.org/en/latest/goodpractices.html
"""
from flask import Flask
from app.views import register_views
from app.connections import db


def create_app(config_class=None):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize the database and create the database file.
    db.init_app(app)
    with app.app_context():
        db.create_all()

    register_views(app)

    return app
