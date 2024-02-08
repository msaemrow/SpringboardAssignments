from models import User, Post, db
from app import app

db.drop_all()
db.create_all()

u1 = User(first_name="Dwight", last_name="Schrute")
u2 = User(first_name="Jim", last_name="Halpert")
u3 = User(first_name="Michael", last_name="Scott")
u4 = User(first_name="Toby", last_name="Flenderson")
u5 = User(first_name="Kevin", last_name="Malone")
u6 = User(first_name="Andy", last_name="Bernard")
u7 = User(first_name="Pam", last_name="Halpert")


db.session.add_all([u1, u2, u3, u4, u5, u6, u7])

db.session.commit()

p1 = Post(title = "Bears, Beets, ...", content= "These are the top 3 B words out there", user_id=1)
p2 = Post(title = "K.I.S.S", content= "Keep it simple stupid. Best advice ever", user_id=1)
p3 = Post(title = "Cornell Rules!", content= "Cornell is the best college ever and I went there!", user_id=6)
p4 = Post(title = "Best chili", content= "I have the best chili recipe. It contains ....", user_id=5)
p5 = Post(title = "Pranks", content= "My top 3 pranks on Dwight are 1).. 2).. 3)..", user_id=2)
p6 = Post(title = "Worlds Best Boss", content= "You miss 100 percent of the shots you don't take - Wayne Gretzke -Michael Scott", user_id=3)
p7 = Post(title = "New book out now!", content= "I just release my new murder myster book. Go buy it now!", user_id=4)

db.session.add_all([p1, p2, p3, p4, p5, p6, p7])

db.session.commit()

