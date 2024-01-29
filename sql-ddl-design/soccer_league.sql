-- from the terminal run:
-- psql < soccer_league.sql

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE team
(
    id SERIAL PRIMARY KEY,
    city TEXT NOT NULL,
    team_name TEXT NOT NULL,
    wins INTEGER NOT NULL,
    losses INTEGER NOT NULL,
    league_ranking INTEGER NOT NULL
);

CREATE TABLE position
(
    id SERIAL PRIMARY KEY,
    position_name TEXT NOT NULL
);

CREATE TABLE player
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    position_id INTEGER REFERENCES position,
    team_id INTEGER REFERENCES team
);

CREATE TABLE game
(
    id SERIAL PRIMARY KEY,
    date_of_game TEXT NOT NULL,
    home_team_id INTEGER REFERENCES team,
    away_team_id INTEGER REFERENCES team,
    winning_team_id INTEGER REFERENCES team,
    home_score INTEGER NOT NULL,
    away_score INTEGER NOT NULL
);

CREATE TABLE goal
(
    id SERIAL PRIMARY KEY,
    player_id INTEGER REFERENCES player,
    game_id INTEGER REFERENCES game,
    minute_of_goal INTEGER NOT NULL
);

CREATE TABLE referee
(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL
);

CREATE TABLE game_referee
(
    id SERIAL PRIMARY KEY,
    referee_id INTEGER REFERENCES referee,
    game_id INTEGER REFERENCES game,
    referee_position TEXT NOT NULL
);

INSERT INTO team
(city, team_name, wins, losses, league_ranking)
VALUES
('Minneapolis', 'Mustangs', 5, 2, 1), 
('Des Moines', 'Dragons', 1, 6, 2);

INSERT INTO position
(position_name)
VALUES
('Goalie'),
('Striker'),
('Defender'),
('Midfield');

INSERT INTO player
(first_name, last_name, position_id, team_id)
VALUES
('Jon', 'Doe', 1, 1), 
('Bob', 'Smith', 2, 1), 
('Robert', 'Johnson', 3, 2);

INSERT INTO game
(date_of_game, home_team_id, away_team_id, winning_team_id, home_score, away_score)
VALUES
('1-29-2024', 1, 2, 1, 4, 1), 
('2-4-2024', 2, 1, 1, 2, 3); 

INSERT INTO goal
(player_id, game_id, minute_of_goal)
VALUES
(1, 1, 8), 
(2, 1, 26), 
(2, 2, 88);

INSERT INTO referee
(first_name, last_name)
VALUES
('Jim', 'Halpert'), 
('Dwight', 'Schrute');

INSERT INTO game_referee
(referee_id, game_id, referee_position)
VALUES
(1, 1, 'Head'),
(2, 1, 'Assistant'),
(1, 2, 'Head'),
(2, 2, 'Assistant');