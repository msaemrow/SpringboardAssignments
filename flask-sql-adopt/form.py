from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField, TextAreaField
from wtforms.validators import InputRequired, Optional


class PetInfoForm(FlaskForm):
    """Adds or edits the information for the Pet model"""
    name = StringField("Pet Name")
    species = StringField("Pet Species")
    photo_url = StringField("Profile Picture Url")
    age = IntegerField("Pet age in years")
    available = BooleanField("Available for adoption")
    notes = TextAreaField("Notes about the pet")