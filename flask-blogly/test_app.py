from unittest import TestCase
from app import app 
from models import db, User, Post
import datetime

# Set up a test client
app.config['TESTING'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
# need to remember to create db before testing-- do this by running createdb blogly_test

db.drop_all()
db.create_all()

class UserViewsTestCase(TestCase):
    # Tests function of /users routes
    def setUp(self):
        """delete any previous users and then add a new sample user"""
        User.query.delete()

        user = User(first_name="Bob", last_name="Jones", image_url="www.google.com")
        db.session.add(user)
        db.session.commit()

        self.user_id = user.id

    def tearDown(self):
        """clean up any pending transactions"""
        db.session.rollback()

    def test_current_users(self):
        with app.test_client() as client:
            res = client.get("/users")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn("Bob Jones", html)

    def test_users_new(self):
        with app.test_client() as client:
            res = client.get("/users/new")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("<h2>Create user account</h2>", html)

    def test_users_details(self):
        with app.test_client() as client:
            res = client.get(f"/users/{self.user_id}")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("Bob Jones", html)
            self.assertIn('<img src="www.google.com" alt="Profile Picture">', html)


    def test_edit_user(self):
        with app.test_client() as client:
            res = client.get(f"/users/{self.user_id}/edit")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("<h2>Edit User Information</h2>", html)


class PostViewsTestCase(TestCase):
    # Test function of /posts routes
    def setUp(self):
        """delete any previous users and then add a new sample user and sample post"""
        User.query.delete()

        user = User(first_name="Bob", last_name="Jones", image_url="www.google.com")
        db.session.add(user)
        db.session.commit()

        post = Post(title="This is the title", content="This is the content", user_id=user.id)
        db.session.add(post)
        db.session.commit()

        self.user_id = user.id
        self.post_id = post.id

    def tearDown(self):
        """clean up any pending transactions"""
        Post.query.delete()
        db.session.commit()

    User.query.delete()
    db.session.commit()

    def test_show_post(self):
        with app.test_client() as client:
            res = client.get(f"/posts/{self.post_id}")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("This is the title", html)
            self.assertIn("This is the content", html)
            self.assertIn("Bob Jones", html)     

    def test_edit_post(self):
        with app.test_client() as client:
            res = client.get(f"/posts/{self.post_id}/edit")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("<h2>Edit Post Information</h2>", html)