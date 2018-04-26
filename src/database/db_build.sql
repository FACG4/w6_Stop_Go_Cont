BEGIN;
DROP TABLE IF EXISTS users, posts, comments CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY ,
  name VARCHAR NOT NULL ,
  user_name VARCHAR UNIQUE NOT NULL ,
  password VARCHAR NOT NULL CHECK (length(password)>=6) ,
  role VARCHAR DEFAULT 'student',
  email VARCHAR(30) UNIQUE
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id  INTEGER REFERENCES users(id) ON DELETE CASCADE,
  post_content TEXT NOT NULL CHECK (length(post_content)>0),
  type_of_note  VARCHAR(10) NOT NULL CHECK (type_of_note IN ('STOP', 'GO', 'CONT'))
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  post_id INTEGER REFERENCES posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  comment_content TEXT NOT NULL
);

INSERT INTO users (name,user_name,password,role,email)
VALUES ('MARWA','MARWA','$2b$08$J942/cvn3waPhENFwIX0Du2Z4Nwx0sAaSGAIqeDTysyVCbg6puNma',DEFAULT,'ma@mail.com'),
        ('MOHAMMED','MOHAMMED','$2b$08$J942/cvn3waPhENFwIX0Du2Z4Nwx0sAaSGAIqeDTysyVCbg6puNma',DEFAULT, 'mo@email.com'),
        ('ISHAK','ISHAK','$2b$08$J942/cvn3waPhENFwIX0Du2Z4Nwx0sAaSGAIqeDTysyVCbg6puNma',DEFAULT,'i@mail.com'),
        ('RAMY','RAMY','$2b$08$J942/cvn3waPhENFwIX0Du2Z4Nwx0sAaSGAIqeDTysyVCbg6puNma',DEFAULT,'r@mail.com');

INSERT INTO posts (user_id,post_content,type_of_note)
VALUES (1,'stop stop stop','STOP'),
      (2,'GO GOG GO','GO'),
      (3,'CONT. CONT. CONT.','CONT'),
      (4,'stop ramy and ishak','STOP'),
      (4,'go fun time','GO'),
      (3,'continue team','CONT');

COMMIT ;
