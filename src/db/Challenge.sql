CREATE DATABASE Challenge

-- Create the Users table
CREATE TABLE Users (
  user_id INT IDENTITY (1,1) PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

INSERT INTO Users (username, email, password)
VALUES ('Jesse Pinkman', 'jpinkman@mail.com', 'password123'),
('Andrew Kibe', 'kibeandy@mail.com', 'pass254');

-- Create the Posts table
CREATE TABLE Posts (
  post_id INT IDENTITY (1,1) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  user_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id)
);
INSERT INTO Posts (title, content, user_id)
VALUES ('Travel Memories', 'I recently visited an amazing country and made unforgettable memories.', 2);



-- Create the Comments table
CREATE TABLE Comments (
  comment_id INT IDENTITY(1,1)PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT,
  post_id INT,
  FOREIGN KEY (user_id) REFERENCES Users(user_id),
  FOREIGN KEY (post_id) REFERENCES Posts(post_id)
);

INSERT INTO Comments (content, user_id, post_id)
VALUES ('Great post! Looking forward to reading more.', 2, 1);

