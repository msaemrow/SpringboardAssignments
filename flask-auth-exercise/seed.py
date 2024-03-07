from models import User, Feedback, db
from app import app

db.drop_all()
db.create_all()
