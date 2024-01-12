from boggle import Boggle
from flask import Flask, render_template, session, request, jsonify
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
boggle_game = Boggle()

app.debug = True

app.config['SECRET_KEY'] = 'bogglegameboard'

toolbar = DebugToolbarExtension(app)

@app.route('/')
def boggle_home_page():
    """display game board on page"""

    board = boggle_game.make_board()
    session['board'] = board
    highscore = session.get('highscore', 0)
    num_games = session.get('num_games', 0)
    return render_template('game-page.html', board=board, num_games=num_games, highscore=highscore)

@app.route('/check-word')
def check_word():
    word = request.args["word"]
    board = session['board']
    response = boggle_game.check_valid_word(board, word)
    return jsonify({'result':response})

@app.route('/post-score', methods=["POST"])
def post_score():
    score=request.json['score']
    highscore=session.get('highscore', 0)
    num_games=session.get('num_games',0)

    session['num_games'] = num_games + 1
    session['highscore'] = max(score, highscore)

    return jsonify(brokeRecord=score > highscore)


