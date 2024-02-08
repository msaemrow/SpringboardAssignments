from models import Pet, db
from app import app

db.drop_all()
db.create_all()

p1=Pet(name="spot", species="dog")
p2=Pet(name="bo", species="dog")
p3=Pet(name="benny", species="dog")
p4=Pet(name="feathers", species="duck")
p5=Pet(name="angelo", species="duck")
p6=Pet(name="rudy", species="rabbit")
p7=Pet(name="randy", species="rabbit", available=False)

db.session.add_all([p1, p2, p3, p4, p5, p6, p7])

db.session.commit()