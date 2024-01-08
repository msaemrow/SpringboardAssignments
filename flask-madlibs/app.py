from flask import Flask, render_template, request
from flask_debugtoolbar import DebugToolbarExtension
from stories import stories

app = Flask(__name__)

app.config['SECRET_KEY'] = "secret"

debug = DebugToolbarExtension(app)

@app.route('/home')
def load_home_page():
    """Load home page and show list of stories to choose from"""
    
    return render_template("home.html", stories=stories.values())

@app.route('/create_story')
def create_story():
    """Create form with story variables based on story"""
    story_id = request.args["story_id"]
    story = stories[story_id]

    prompts = story.prompts

    return render_template("create_story.html",
                           story_id=story_id,
                           title=story.title,
                           prompts=prompts)


@app.route('/story')
def load_story():
    """Load story results based on variables entered"""
    story_id = request.args["story_id"]
    story = stories[story_id]

    text=story.generate(request.args)

    return render_template("story.html", text=text, title=story.title)

