from unittest import TestCase
from app import app 
from models import db, User, Post

# Set up a test client
app.config['TESTING'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
# need to remember to create db before testing-- do this by running createdb blogly_test

db.drop_all()
db.create_all()

class UserModelTestCase(TestCase):
    """Tests the model for users"""

    def setUp(self):
        """clear any existing users"""
        User.query.delete()
    
    def tearDown(self):
        """clear any pending transactions"""
        db.session.rollback()

    def test_user_creation(self):
        user = User(first_name="John", last_name="Smith", image_url="www.google.com")
        self.assertEqual(user.first_name, "John")
        self.assertEqual(user.last_name, "Smith")
        self.assertEqual(user.image_url, "www.google.com")

    def test_full_name(self):
        """checks to make sure first and last name is combined correctly"""
        user = User(first_name="John", last_name="Smith")
        self.assertEqual(user.get_full_name, "John Smith")
    
class PostModelTestCase(TestCase):
    """Tests the model for users"""

    def setUp(self):
        """clear any existing users"""
        User.query.delete()
    
    def tearDown(self):
        """clear any pending transactions"""
        db.session.rollback()

    def test_post_creation(self):
        post = Post(title="This is the title", content="This is the content", created_at = "2024-02-07 11:16:17.895742", user_id=1)
        self.assertEqual(post.title, "This is the title")
        self.assertEqual(post.content, "This is the content")
        self.assertEqual(post.created_at, "2024-02-07 11:16:17.895742")
        self.assertEqual(post.user_id, 1)