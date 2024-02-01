from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)
    app.app_context().push()

class Pet(db.Model):
    """create a new pet"""

    __tablename__ = 'pets'

    @classmethod
    def get_by_species(cls, species):
        """returns a list of all pets of a certain species"""
        return cls.query.filter_by(species=species).all()
    
    @classmethod
    def get_all_hungry(cls):
        return cls.query.filter(Pet.hunger > 20).all()

    def __repr__(self):
        """gives a better visual representation of the created Pet object"""
        p=self
        return f"<Pet id={p.id} name={p.name} species={p.species} hunger={p.hunger}>"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String(50),
                     nullable=False,
                     unique=True)
    species = db.Column(db.String(30),
                        nullable= True)
    hunger = db.Column(db.Integer,
                       nullable = False,
                       default = 20)
    
    def greet(self):
        """the pet says hi"""
        return f"Hi, I am {self.name} the {self.species}"
    
    def feed(self, amt=20):
        """updates hunger level"""
        self.hunger -= amt
        self.hunger = max(self.hunger, 0)
