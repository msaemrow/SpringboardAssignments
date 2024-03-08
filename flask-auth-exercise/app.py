from flask import Flask, render_template, redirect, session, flash
from models import connect_db, db, User, Feedback
from forms import NewUserForm, LoginForm, FeedbackForm
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
    if "username" in session:
        return redirect(f"/users/{session['username']}")    
    form = NewUserForm()
    if form.validate_on_submit():
        username = form.username.data
        pwd= User.protect_password(form.password.data)
        email = form.email.data
        first_name = form.first_name.data
        last_name=form.last_name.data
        is_admin=form.is_admin.data

        new_user = User(username=username, password=pwd, email=email, first_name=first_name, last_name=last_name, is_admin=is_admin)

        db.session.add(new_user)
        try:
            db.session.commit()
        except IntegrityError:
            form.username.errors.append('Username taken. Pick a different one')
            return render_template('register.html', form=form)
        session['username'] = new_user.username
        flash('Successfully registered account', 'success')
        return redirect(f"/users/{new_user.username}")

    return render_template('register.html', form=form)

@app.route('/login', methods=["GET", "POST"])
def login_user():
    if "username" in session:
        return redirect(f"/users/{session['username']}")
    form=LoginForm()
    if form.validate_on_submit():
        username=form.username.data
        password=form.password.data

        user = User.authenticate_user(username, password)
        if user:
            flash(f"Login Sucessful. Welcome back {user.first_name}!", "success")
            session['username']=user.username
            return redirect(f"/users/{user.username}")
        else:
            form.username.errors=['Invalid username/password combination']

    return render_template('login.html', form=form)

@app.route('/users/<username>')
def show_user_info(username):
    if "username" not in session or session['username'] != username:
        flash("Log in to view user info", "danger")
        return redirect('/')
    user = User.query.filter_by(username=username).first()
    users=User.query.all()
    all_feedback=Feedback.query.all()
    print(user)
    if user:
        return render_template('user-page.html', user=user, all_users=users, all_feedback=all_feedback)  
    else:
        flash("User not found", "danger")
        return redirect('/')     

@app.route('/secret')
def secret_page():
    if "username" not in session:
        flash("Log in to view page", "danger")
        return redirect('/')
    return render_template('secret-page.html')

@app.route('/logout')
def logout_user():

    session.pop('username')
    flash("Successful logout", "success")
    return redirect('/')

@app.route('/users/<username>/delete', methods=["POST"])
def delete_user(username):
    user=User.query.filter_by(username=username).first()
    print(f"-------------{user.is_admin}----------------------")
    if user.is_admin == True:
        db.session.delete(user)
        db.session.commit()
        session.pop('username')
        flash(f"Successfully deleted {username}'s account", "success")
        return redirect(f"/users/{username}")
    if 'username' not in session or username != session['username']:
        flash("You do not have permission to delete a user!", "danger")
        return redirect('/')
    db.session.delete(user)
    db.session.commit()
    session.pop('username')
    flash(f"Successfully deleted {username}'s account", "success")
    return redirect('/login')

@app.route('/users/<username>/<admin_user>/delete', methods=["POST"])
def admin_delete_user(username, admin_user):      
    delete_user=User.query.filter_by(username=username).first()
    a_user=User.query.filter_by(username=admin_user).first()

    print(f"-------------{a_user}----------------------")

    if a_user.is_admin != True:
        flash("You do not have permission to delete a user!", "danger")

    db.session.delete(delete_user)
    db.session.commit()
    flash(f"Successfully deleted {username}'s account", "success")
    return redirect(f"/users/{a_user.username}")


@app.route('/users/<username>/feedback/add', methods=["GET", "POST"])
def add_feedback(username):
    if 'username' not in session or username != session['username']:
        return redirect('/')
    
    form=FeedbackForm()
    if form.validate_on_submit():
        title=form.title.data
        content=form.content.data
        username=username
        new_feedback=Feedback(title=title, content=content, username=username)
        db.session.add(new_feedback)
        db.session.commit()
        flash("Feedback submitted", "success")
        return redirect(f"/users/{username}")

    return render_template('add-feedback.html', form=form)

@app.route('/feedback/<feedback_id>/update', methods=["GET", "POST"])
def update_feedback(feedback_id):
    feedback=Feedback.query.get(feedback_id)
    form=FeedbackForm(obj=feedback)

    if form.validate_on_submit():
        feedback.title = form.title.data
        feedback.content = form.content.data

        db.session.add(feedback)
        db.session.commit()

        flash("Successfully updated feedback", "success")

        return redirect(f"/users/{feedback.username}")
        
    return render_template('update-feedback.html', form=form)

@app.route('/feedback/<feedback_id>/<admin_user>/update', methods=["POST"])
def admin_update_feedback(feedback_id, admin_user):
    a_user=User.query.filter_by(username=admin_user).first()
    update_feedback=Feedback.query.get(feedback_id)
    form=FeedbackForm(obj=update_feedback)
    
    if a_user.is_admin != True:
        flash("You do not have permission to delete a user!", "danger")
        return redirect(f"/users/{a_user.username}")

    if form.validate_on_submit():
        update_feedback.title = form.title.data
        update_feedback.content = form.content.data

        db.session.add(update_feedback)
        db.session.commit()

        flash("Successfully updated feedback", "success")

        return redirect(f"/users/{a_user.username}")
    
    return render_template('update-feedback.html', form=form)
 
@app.route('/feedback/<feedback_id>/delete', methods=["POST"])
def delete_feedback(feedback_id):
    if 'username' not in session:
        return redirect('/')
    feedback=Feedback.query.get(feedback_id)
    db.session.delete(feedback)
    db.session.commit()
    flash("Deleted user feedback", "success")
    return redirect(f"/users/{feedback.username}")


@app.route('/feedback/<feedback_id>/<admin_user>/delete', methods=["POST"])   
def admin_delete_feedback(feedback_id, admin_user):
    a_user=User.query.filter_by(username=admin_user).first()
    delete_feedback=Feedback.query.get(feedback_id)

    if a_user.is_admin != True:
        flash("You do not have permission to delete other users feedback!", "warning")
        return redirect(f"/users/{a_user.username}")

    db.session.delete(delete_feedback)
    db.session.commit()
    flash(f"Succesfully deleted feedback for {delete_feedback.username}")
    return redirect(f"/users/{a_user.username}")

