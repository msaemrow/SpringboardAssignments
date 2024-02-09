"""Adopt a pet application"""

from flask import Flask, render_template, request, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text
from models import Pet, db, connect_db

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///adopt_pets'
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'chickenzarecool21837'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug_toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def home_page():
    pets = Pet.query.all()
    return render_template('pet-all-home.html', pets=pets)

@app.route('/add')
def add_pet():
    return render_template('pet-new.html')

@app.route('/add', methods=["POST"])
def process_add_pet():
    new_pet = Pet(name=request.form['name'], species=request.form['species'], photo_url=request.form['photo_url'], age=request.form['age'], notes=request.form['notes'])
    db.session.add(new_pet)
    db.session.commit()
    flash(f"Successfully added {new_pet.name}. Click on their photo below for more details", 'success')
    return redirect('/')

@app.route('/pet/<int:pet_id>')
def display_pet_info(pet_id):
    pet = Pet.query.get(pet_id)
    return render_template('pet-display.html', pet = pet)

@app.route('/pet/<int:pet_id>/edit', methods=["POST"])
def process_edit_pet_info(pet_id):
    pet = Pet.query.get(pet_id)
    pet.name = request.form['name']
    pet.species = request.form['species']
    pet.photo_url = request.form['photo_url']
    pet.age = request.form['age']
    pet.notes = request.form['notes']
    pet.available = True if request.form['available'] == 'True' else False

    db.session.add(pet)
    db.session.commit()
    flash(f"Successfully edited {pet.name}'s information", 'success')

    return redirect(f"/pet/{pet_id}")