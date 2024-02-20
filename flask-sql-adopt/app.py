"""Adopt a pet application"""

from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text
from models import Pet, db, connect_db
from form import PetInfoForm

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_pets'
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'chickenzarecool21837'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug_toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def display_home_page():
    """renders home page showing all pets divided into 2 sections- available and pending adoption"""
    pets = Pet.query.all()
    return render_template('pet-all-home.html', pets=pets)

@app.route('/add', methods=["GET", "POST"])
def show_and_process_add_pet_form():
    """Will either show empty add pet form or process submission of add pet form"""
    form = PetInfoForm()
    if form.validate_on_submit():
        photo_url = "https://i.pinimg.com/564x/36/51/6d/36516d2965ed716b6061e303a3f5a35c.jpg" if form.photo_url.data == "" else form.photo_url.data
        new_pet = Pet(name=form.name.data, species=form.species.data, photo_url=photo_url, age=form.age.data, notes=form.notes.data)
        db.session.add(new_pet)
        db.session.commit()
        flash(f"Successfully added {new_pet.name}. Click on their photo below for more details", 'success')
        return redirect('/')  
    else:    
        return render_template('pet-new.html', form=form)


@app.route('/pet/<int:pet_id>', methods=["GET", "POST"])
def display_pet_info(pet_id):
    """displays individual pet info as well as a form to edit the pet information"""
    pet = Pet.query.get(pet_id)
    form = PetInfoForm(obj=pet)
    if form.validate_on_submit():
        pet.name = form.name.data
        pet.species = form.species.data
        pet.photo_url = form.photo_url.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        print(form.available.data)
        pet.available = form.available.data
        print(pet.available)

        db.session.add(pet)
        db.session.commit()
        flash(f"Successfully edited {pet.name}'s information", 'success')
        return redirect(f"/pet/{pet_id}")
    else:
        print(pet.available)
        return render_template('pet-display.html', pet=pet, form=form)
