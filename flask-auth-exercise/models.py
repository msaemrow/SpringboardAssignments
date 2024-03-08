from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcyrpt = Bcrypt()

def connect_db(app):
    """Connect to the database"""
    db.app = app
    db.init_app(app)
    app.app_context().push()

class User(db.Model):
    """User model"""

    __tablename__ = 'users'

    def __repr__(self):
        """Easier to read representation for user"""
        return f"<User {self.id} {self.first_name} {self.last_name} Admin: {self.is_admin}>"  

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    username=db.Column(db.Text,
                       nullable=False,
                       unique=True)
    password=db.Column(db.Text,
                       nullable=False)
    email=db.Column(db.String(50),
                    nullable=False)
    first_name=db.Column(db.String(30),
                         nullable=False)
    last_name=db.Column(db.String(30),
                         nullable=False)
    is_admin=db.Column(db.Boolean,
                       default=False)
    
    feedback = db.relationship('Feedback', backref="users", cascade='all, delete-orphan')
    
    @classmethod
    def protect_password(cls, pwd):
        hashed = bcyrpt.generate_password_hash(pwd)
        hashed_utf8 = hashed.decode("utf8")
        return hashed_utf8
    
    @classmethod
    def authenticate_user(cls, username, pwd):
        """Validate that a user exists and the password is correct"""

        user = User.query.filter_by(username=username).first()

        if user and bcyrpt.check_password_hash(user.password, pwd):
            return user
        else:
            return False
    
class Feedback(db.Model):
    """Feedback model"""

    __tablename__ = 'feedback'

    def __repr__(self):
        """Easier to read representation of feedback model"""
        return f"<Feedback: {self.id}. Title: {self.title} by {self.username}>"  
    
    id=db.Column(db.Integer,
                 primary_key=True,
                 autoincrement=True)
    title=db.Column(db.Text,
                    nullable=False)
    content=db.Column(db.Text,
                      nullable=False)
    username=db.Column(db.Text,
                       db.ForeignKey('users.username'))
    
