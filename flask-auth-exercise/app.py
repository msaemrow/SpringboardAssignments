from flask import Flask, render_template, redirect, session, flash
from models import connect_db, db, User
from forms import NewUserForm, LoginForm
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] ="postgresql:///auth_exercise"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"]=False
app.config["SECRET_KEY"] = "auth-demo-key"

connect_db(app)

@app.route('/')
def home_page():
    return render_template('home.html')


@app.route('/register', methods=["GET", "POST"])
def register_user():
    form = NewUserForm()
    if form.validate_on_submit():
        username = form.username.data
        pwd= User.protect_password(form.password.data)
        email = form.email.data
        first_name = form.first_name.data
        last_name=form.last_name.data

        new_user = User(username=username, password=pwd, email=email, first_name=first_name, last_name=last_name)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Pick a different one')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Successfully registered account')
        return redirect(f"/users/{new_user.username}")

    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login_user():
    form=LoginForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data

        user = User.authenticate_user(username, password)
        if user:
            flash(f"Login Sucessful. Welcome back {user.first_name}!")
            session['username']=user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors=['Invalid username/password combination']

    return render_template('login.html', form=form)

@app.route('/users/<username>')
def show_user_info(username):
    if "username" not in session or session['username'] != username:
        flash("Log in to view user info")
        return redirect('/')
    try:
        user = User.query.filter_by(username=username).first()
        return render_template('user-page.html', user=user)  
    except:
        flash("User not found")
        return redirect('/')     

@app.route('/secret')
def secret_page():
    if "username" not in session:
        flash("Log in to view page")
        return redirect('/')
    return render_template('secret-page.html')

@app.route('/logout')
def logout_user():

    session.pop('username')
    flash("Successful logout")
    return redirect('/')

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    if 'username' not in session or username != session['username']:
        return redirect('/')
    user=User.query.filter_by(username=username).first()
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    flash(f"Successfully deleted {username}'s account")
    return redirect('/login')