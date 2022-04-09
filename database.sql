/*Create role*/
CREATE ROLE user_public;
/*Give grants user*/
GRANT INSERT to user_public;
/*Create database*/
CREATE DATABASE moodapp;

/*\c moodapp*/

/*Create tables*/
CREATE TABLE users(
    userid SERIAL PRIMARY KEY,
    username VARCHAR(15),
    password VARCHAR(20)
);

CREATE TABLE user_mood(
    mood_id SERIAL PRIMARY KEY,
    user_idfk integer REFERENCES users (userid),
    mood_date DATE,
    mood_descr VARCHAR(15)
);
