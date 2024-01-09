from flask import Flask, render_template, redirect, request, session, flash
from flask_debugtoolbar import DebugToolbarExtension
from surveys import satisfaction_survey as survey

app = Flask(__name__)
app.config['SECRET_KEY'] = 'flask_survery'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Ensure that debug mode is *on*
app.debug = True

toolbar = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"

@app.route('/')
def home_page():
    # title = satisfaction_survey.title
    # instructions = satisfaction_survey.instructions
    # return render_template('home.html', title=title, instructions=instructions)
    return render_template('home.html',survey=survey)

@app.route('/start', methods=["POST"])
def start_survey():
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")


@app.route('/answer', methods=["POST"])
def store_answer():
    """Store response and redirect to next question"""
    choice = request.form['answer']   
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(survey.questions)):
        return redirect('/complete')
    
    else:
        return redirect(f"/questions/{len(responses)}")


@app.route('/questions/<int:qnum>')
def display_question(qnum):
    """Displays question"""
    responses = session.get(RESPONSES_KEY)

    if responses is None:
        return redirect("/")
    
    if (len(responses) == len(survey.questions)):
        return redirect("/complete")

    if (len(responses) != qnum):
        return redirect(f"/questions/{len(responses)}")
    
    question = survey.questions[qnum]

    return render_template('question.html', question=question, survey=survey)


@app.route('/complete')
def complete():
    return render_template('complete.html', survey=survey)