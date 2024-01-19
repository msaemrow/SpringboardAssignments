from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class BoggleGameTests(TestCase):
    def setUp(self):
        """Completed before every test."""

        # self.client = app.test_client()
        app.config['TESTING'] = True
        app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']

    def test_boggle_home_page(self):
        """Make sure information is in the session and HTML is displayed"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<p>High Score:', html)
            self.assertIn('<p>Current Score:', html)
            self.assertIn('Time Remaining:', html)
            self.assertIn('<p>Number of Games:', html)
            self.assertIsNone(session.get('highscore'))
            self.assertIsNone(session.get('num_games'))
            self.assertIn('board', session)
            
    def test_check_valid_word(self):
        """Make sure word is correctly indentified in the board and returned"""
        with app.test_client() as client:
            with client.session_transaction() as new_session:
                new_session['board'] = [["H", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "S", "S"], 
                                        ["M", "A", "T", "C", "H"], 
                                        ["C", "R", "A", "S", "H"]]
            res = client.get('/check-word?word=hatch')                
            self.assertEqual(res.json['result'], 'ok')
            self.assertEqual(res.status_code, 200)
    
    def test_check_not_on_board(self):
        """Make sure word is correctly indentified as not on the board"""
        with app.test_client() as client:
            with client.session_transaction() as new_session:
                new_session['board'] = [["H", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "S", "S"], 
                                        ["M", "A", "T", "C", "H"], 
                                        ["C", "R", "A", "S", "H"]]
            res = client.get('/check-word?word=boring')                
            self.assertEqual(res.json['result'], 'not-on-board')
            self.assertEqual(res.status_code, 200)

    def test_check_not_a_word(self):
        """Make sure word is correctly indentified as not being an english word"""
        with app.test_client() as client:
            with client.session_transaction() as new_session:
                new_session['board'] = [["H", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "C", "H"], 
                                        ["B", "A", "T", "S", "S"], 
                                        ["M", "A", "T", "C", "H"], 
                                        ["C", "R", "A", "S", "H"]]
            res = client.get('/check-word?word=abcdef')                
            self.assertEqual(res.json['result'], 'not-a-word')
            self.assertEqual(res.status_code, 200)

    def test_post_score(self):
        """Make sure word is correctly added and the highscore and num_games are updated"""
        with app.test_client() as client:
            with client.session_transaction() as new_session:
                new_session['highscore']=40
                new_session['num_games']=10

            data={'score': 50}
            res = client.post('/post-score', json=data)
            self.assertEqual(res.status_code, 200)
            self.assertEqual(res.json['brokeRecord'], True)

            self.assertEqual(session.get('highscore'),50)
            self.assertEqual(session.get('num_games'),11)

