-- from the terminal run:
-- psql < craigslist.sql

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE region
(
    id SERIAL PRIMARY KEY,
    region_name TEXT NOT NULL
);

CREATE TABLE user_info
(
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    preferred_region INTEGER REFERENCES region
);

CREATE TABLE category
(
    id SERIAL PRIMARY KEY,
    cat_name TEXT NOT NULL
);

CREATE TABLE posts
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES user_info,
    title TEXT NOT NULL,
    post_desc TEXT NOT NULL,
    category_id INTEGER REFERENCES category,
    post_location TEXT NOT NULL,
    post_region INTEGER REFERENCES region
);

INSERT INTO region
  (region_name)
VALUES
  ('Des Moines'), ('Minnapolis'), ('Milwaukee');

  INSERT INTO user_info
  (user_name, preferred_region)
VALUES
  ('User1', 1), ('User2', 1), ('User3', 2);

INSERT INTO category
  (cat_name)
VALUES
  ('Games'), ('Outdoors'), ('Furniture'), ('Cars');


INSERT INTO posts
  (user_id, title, post_desc, category_id, post_location, post_region)
VALUES
  (1, 'Sample text 1', 'sample description 1', 4, 'Town 1', 1),
  (1, 'Sample text 2', 'sample description 2', 3, 'Town 2', 1),
  (2, 'Sample text 3', 'sample description 3', 2, 'Town 3', 1),
  (3, 'Sample text 4', 'sample description 4', 1, 'Town 4', 2);
