from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired  

class NewUserForm(FlaskForm):
    """Registration form for a new user"""  
    
    username= StringField("Username", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
    password= PasswordField("Password", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
    email= StringField("Email", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
    first_name= StringField("First Name", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
    last_name= StringField("Last Name", validators=[InputRequired()], render_kw={'autocomplete': 'off'})

class LoginForm(FlaskForm):
    """Login form for returning users"""
    username= StringField("Username", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
    password= PasswordField("Password", validators=[InputRequired()], render_kw={'autocomplete': 'off'})
