DROP DATABASE IF EXISTS dietWorld;

CREATE DATABASE dietWorld;

USE dietWorld;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE favorite (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId INT,
  restaurantId VARCHAR(255),
  name VARCHAR(255),
  image_url VARCHAR(255),
  rating INT(11),
  price VARCHAR(11),
  phone VARCHAR(255),
  categories VARCHAR(255),
  address VARCHAR(255),
  review_count INT(11),
  distance VARCHAR(255)
);

INSERT INTO users (name) VALUES ('vanessa');
INSERT INTO favorite (userId, restaurantId, name, image_url, rating, price, phone, categories, address, review_count, distance) VALUES (1, "zooS5ms4-vz3evQ3Cn6tmA", "Mulberry & Vine", "https://s3-media4.fl.yelpcdn.com/bphoto/JgOW4rXj0mwPiG5MElTHdw/o.jpg", 4, "$$", "(917) 810-2880", "American (New)", "155 E 44th St\nNew York, NY 10017", 53, '1.4mile')

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
