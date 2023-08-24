/*Create database*/
CREATE DATABASE feelu;

/*Create role in POSTGRESS*/
CREATE ROLE user_public;

/*OR FOR MARIADB*/
CREATE USER 'user_public'@'host' IDENTIFIED BY 'password';
GRANT GRANT SELECT, INSERT, UPDATE, CREATE, ALTER, INDEX, EXECUTE ON feelu TO 'user_public'@'localhost';



/*Create tables*/
CREATE TABLE users(
    userid INTEGER PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(30),
    password VARCHAR(500)
);

CREATE TABLE user_moods(
  mood_id INTEGER PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  mood_date DATE,
  mood_desc VARCHAR(500),
  FOREIGN KEY (user_id) REFERENCES users(userid)
);

