BEGIN;
DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  user_name VARCHAR UNIQUE NOT NULL ,
  password VARCHAR NOT NULL CHECK (length(password)>=6) ,
  role VARCHAR DEFAULT 'student',
  email VARCHAR(30) UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id  INTEGER REFERENCES users(id) ON UPDATE CASCADE,
  post_content TEXT NOT NULL CHECK (length(post_content)>0),
  type_of_note  VARCHAR(10) NOT NULL CHECK (type_of_note IN ('STOP', 'GO', 'CONT'))
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON UPDATE CASCADE,
  user_id INTEGER REFERENCES users(id) ON UPDATE CASCADE,
  comment_content TEXT NOT NULL
);

INSERT INTO users (user_name,password,role,email)
VALUES ('MARWA','123456',DEFAULT,'ma@mail.com'),
        ('MOHAMMED','123456',DEFAULT, 'mo@email.com'),
        ('ISHAK','123456',DEFAULT,'i@mail.com'),
        ('RAMY','123456',DEFAULT,'r@mail.com');

INSERT INTO posts (user_id,post_content,type_of_note)
VALUES (1,'stop stop stop','STOP'),
      (2,'GO GOG GO','GO'),
      (3,'CONT. CONT. CONT.','CONT'),
      (4,'stop ramy and ishak','STOP'),
      (4,'go fun time','GO'),
      (3,'continue team','CONT');

COMMIT ;
