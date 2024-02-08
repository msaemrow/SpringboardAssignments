"""Blogly application."""

from flask import Flask, render_template, request, redirect
from flask_debugtoolbar import DebugToolbarExtension
from sqlalchemy import text
from models import db, connect_db, User, Post
import datetime

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly'
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = 'chickenzarecool21837'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug_toolbar = DebugToolbarExtension(app)

connect_db(app)
################## routes for users ############################

@app.route('/')
def home_page():
    posts = Post.query.order_by(Post.created_at.desc()).limit(5).all()
    return render_template('home.html', posts= posts)

@app.errorhandler(404)
def page_not_found_error():
    """Custom 404 Not Found page"""
    return render_template('error.html'), 404    

@app.route('/users')
def show_user_list():
    users = User.query.order_by(User.last_name, User.first_name).all()
    return render_template('current-users.html', users=users)

@app.route('/users/new')
def show_new_user_form():
    return render_template('new-user.html')

@app.route('/users/new', methods=["POST"])
def process_new_user():
    first_name = request.form['first_name']
    last_name = request.form['last_name']
    image_url = request.form['image_url']

    new_user = User(first_name=first_name, last_name=last_name, image_url=image_url)
    db.session.add(new_user)
    db.session.commit()
    return redirect('/users')

@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get(user_id)
    return render_template("details.html", user=user)

@app.route('/users/<int:user_id>/edit')
def edit_user(user_id):
    user = User.query.get(user_id)
    return render_template("edit-profile.html", user=user)

@app.route('/users/<int:user_id>/edit', methods=["POST"])
def process_edit_user(user_id):
    user = User.query.get(user_id)
    user.first_name = request.form['first_name']
    user.last_name = request.form['last_name']
    user.image_url = request.form['image_url']

    db.session.add(user)
    db.session.commit()
    return redirect(f"/users/{user_id}")

@app.route('/users/<int:user_id>/delete', methods=["POST"])
def delete_user(user_id):
    user = User.query.get_or_404(user_id)
    db.session.delete(user)
    db.session.commit()
    return redirect('/users')

################## routes for user posts  ############################

@app.route('/users/<int:user_id>/posts/new')
def new_post(user_id):
    user = User.query.get(user_id)
    return render_template("new-post.html", user=user)

@app.route('/users/<int:user_id>/posts/new', methods=["POST"])
def process_new_post(user_id):
    user = User.query.get(user_id)
    new_post = Post(title=request.form['title'], content=request.form['content'], user_id=user.id)
    db.session.add(new_post)
    db.session.commit()
    return redirect(f"/users/{user.id}")

@app.route('/posts/<int:post_id>')
def show_post(post_id):
    post = Post.query.get(post_id)
    return render_template("post.html", post=post)

@app.route('/posts/<int:post_id>/edit')
def edit_post(post_id):
    post = Post.query.get(post_id)
    return render_template("edit-post.html", post=post)

@app.route('/posts/<int:post_id>/edit', methods=["POST"])
def process_edit_post(post_id):
    post = Post.query.get(post_id)
    post.title = request.form['title']
    post.content = request.form['content']
    post.created_at = datetime.datetime.now()

    db.session.add(post)
    db.session.commit()
    return redirect(f"/posts/{post_id}")

@app.route('/posts/<int:post_id>/delete', methods=["POST"])
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(f"/users/{post.user_id}")
