from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextAreaField, SelectField
from wtforms.validators import InputRequired, Optional, URL, NumberRange    


class PetInfoForm(FlaskForm):
    """Adds or edits the information for the Pet model"""
    choices = [('Rabbit', 'Rabbit'), ('Duck', 'Duck'), ('Dog', 'Dog'), ('Parrot', 'Parrot')]

    name = StringField("Pet Name", validators=[InputRequired()])
    species = SelectField("Pet Species", choices=choices, validators=[InputRequired()])
    photo_url = StringField("Profile Picture Url", validators=[URL(message="Please add a valid URL"), Optional()])
    age = IntegerField("Pet age in years", validators=[InputRequired(), NumberRange(min=0, max=30)])
    available = BooleanField("Available for adoption")
    notes = TextAreaField("Notes about the pet", validators=[Optional()])