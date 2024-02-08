"""Models for Adopt a pet application."""
from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def connect_db(app):
    """Connect to database in the Flask app"""
    db.app = app
    db.init_app(app)
    app.app_context().push()


class Pet(db.Model):
    """pet model"""

    __tablename__ = "pets"

    id = db.Column(db.Integer,
                    primary_key=True,
                    autoincrement=True)
    name=db.Column(db.Text,
                   nullable=False)
    species=db.Column(db.Text,
                      nullable=False)
    photo_url=db.Column(db.Text,
                        default="https://i.pinimg.com/564x/36/51/6d/36516d2965ed716b6061e303a3f5a35c.jpg")
    age=db.Column(db.Integer)
    notes=db.Column(db.Text)
    available=db.Column(db.Boolean,
                        default=True)