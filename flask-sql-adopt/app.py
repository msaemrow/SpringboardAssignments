"""Adopt a pet application"""

from flask import Flask, render_template, request, redirect
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
    return redirect('/')