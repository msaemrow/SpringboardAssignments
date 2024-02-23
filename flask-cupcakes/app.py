"""Flask app for Cupcakes"""

from flask import Flask, render_template, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text
from models import db, connect_db, Cupcake

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'

app.config['SECRET_KEY'] = 'this_is_the_secret_key'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug_toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def display_home_page():
    return render_template('home.html')


@app.route('/api/cupcakes')
def get_all_cupcakes():
    all_cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.all()]
    return jsonify(cupcakes=all_cupcakes)

@app.route('/api/cupcakes/<int:id>')
def get_single_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def create_cupcake():
    data=request.json
    new_cupcake=Cupcake(flavor=data["flavor"], size=data["size"], rating=data["rating"], image=data["image"] or None)
    db.session.add(new_cupcake)
    db.session.commit()
    return (jsonify(cupcake=new_cupcake.serialize()), 201)

@app.route('/api/cupcakes/<int:id>', methods=["PATCH"])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    cupcake.flavor = request.json["flavor"]
    cupcake.size=request.json["size"]
    cupcake.rating=request.json["rating"]
    cupcake.image=request.json["image"]
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())


@app.route('/api/cupcakes/<int:id>', methods=["DELETE"])
def delete_cupcake(id):
    cupcake = Cupcake.query.get_or_404(id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted cupcake")

