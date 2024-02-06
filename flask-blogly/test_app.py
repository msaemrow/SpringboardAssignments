from unittest import TestCase
from app import app 
from models import db, User

# Set up a test client
app.config['TESTING'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
# need to remember to create db before testing-- do this by running createdb blogly_test

db.drop_all()
db.create_all()

class UserViewsTestCase(TestCase):
    # Create test users in the database
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
            self.assertIn("Details about Bob Jones", html)
            self.assertIn("First Name:", html)
            self.assertIn("Last Name:", html)
            self.assertIn('<img src="www.google.com" alt="Profile Picture">', html)


    def test_edit_user(self):
        with app.test_client() as client:
            res = client.get(f"/users/{self.user_id}/edit")
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)   
            self.assertIn("<h2>Edit User Information</h2>", html)