from flask import Flask, render_template, redirect, request, session, make_response
from flask_debugtoolbar import DebugToolbarExtension
from surveys import surveys

app = Flask(__name__)
app.config['SECRET_KEY'] = 'flask_survery'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# Ensure that debug mode is *on*
app.debug = True

toolbar = DebugToolbarExtension(app)

RESPONSES_KEY = "responses"
CURR_SURVEY_KEY = "current_survey"

@app.route('/')
def home_page():
    return render_template('home.html',survey_list=surveys)

@app.route("/", methods=["POST"])
def pick_survey():
    survey_id = request.form['survey_abbr']

    if request.cookies.get(f"completed_{survey_id}"):
        return render_template("already-completed.html")
    
    survey = surveys[survey_id]
    session[CURR_SURVEY_KEY] = survey_id

    return render_template('start.html', survey=survey)

@app.route('/start', methods=["POST"])
def begin_survey():
    session[RESPONSES_KEY] = []

    return redirect("/questions/0")


@app.route('/answer', methods=["POST"])
def store_answer():
    """Store response and redirect to next question"""
    choice = request.form['answer']
    text = request.form.get("text", "")   

    responses = session[RESPONSES_KEY]
    responses.append({"choice": choice, "text": text})

    session[RESPONSES_KEY] = responses
    survey_id = session[CURR_SURVEY_KEY]
    survey = surveys[survey_id]

    if (len(responses) == len(survey.questions)):
        return redirect('/complete')
    
    else:
        return redirect(f"/questions/{len(responses)}")


@app.route('/questions/<int:qnum>')
def display_question(qnum):
    """Displays question"""
    responses = session.get(RESPONSES_KEY)
    survey_id = session[CURR_SURVEY_KEY]
    survey = surveys[survey_id]

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
    responses = session.get(RESPONSES_KEY)
    survey_id = session[CURR_SURVEY_KEY]
    survey = surveys[survey_id]

    html = render_template('complete.html', responses=responses, questions=survey.questions, survey=survey)
    response = make_response(html)
    response.set_cookie(f"completed_{survey_id}", "yes", max_age=20)
    return response