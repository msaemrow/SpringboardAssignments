from flask_sqlalchemy import SQLAlchemy
import datetime
"""Models for Blogly."""

db = SQLAlchemy()

def connect_db(app):
    """Connect to database in the Flask app"""
    db.app = app
    db.init_app(app)
    app.app_context().push()

class User(db.Model):
    """User model"""

    __tablename__ = 'users'

    def __repr__(self):
        """Easier to read representation for user"""
        return f"<User {self.first_name} {self.last_name} {self.image_url}>"    

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    first_name = db.Column(db.String(50),
                           nullable=False)
    last_name = db.Column(db.String(75),
                           nullable=False)
    image_url = db.Column(db.Text,
                          default='https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg')

    posts = db.relationship("Post", backref="users", cascade='all, delete-orphan')

    @property
    def get_full_name(self):
        """returns full name of the user"""
        return f"{self.first_name} {self.last_name}"

class Post(db.Model):
    """Blog Post Model"""

    __tablename__ = 'posts'

    id = db.Column(db.Integer,
        primary_key=True,
        autoincrement=True)
    title = db.Column(db.Text,
                      nullable=False)
    content = db.Column(db.Text,
                        nullable=False)
    created_at = db.Column(db.DateTime,
                            nullable=False,
                            default=datetime.datetime.now)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id'),
                        nullable=False)
    
    @property
    def formatted_created_at(self):
        return self.created_at.strftime("%b %-d %Y")
    
