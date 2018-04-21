const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b7224f0ec787b2',
  password : '49258c2c',
  database : 'heroku_a40acc849b598ad'
});

// connection.connect((err) => {
//   const sql = "CREATE DATABASE IF NOT EXISTS heroku_a40acc849b598ad; USE heroku_a40acc849b598ad; CREATE TABLE users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);CREATE TABLE favorite (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,userId INT,restaurantId VARCHAR(255) UNIQUE KEY,name VARCHAR(255),image_url VARCHAR(255),rating INT(11),price VARCHAR(11),phone VARCHAR(255),categories VARCHAR(255),address VARCHAR(255),review_count INT(11),distance VARCHAR(255));"
//   connection.query(sql, (err, results) => {
//     (err) ?
//     console.error(err) :
//     console.log('created')
//   })
// });

const getUser = (username, callback) => {
  const query = `SELECT * FROM users WHERE name="${username}";`;
  connection.query(query, (err, results, fields) => {
    (err) ? 
    console.error(err) : 
    callback(results)
  })
}

const saveUser = (username, callback) => {
  const query = `INSERT INTO users (name) VALUES (?);`;
  connection.query(query, [username], (err, results, fields) => {
    (err) ?
    console.error(err) :
    callback(results)
  })
}

const saveFavorite = (params, callback) => {
  const restaurant = params.restaurant;
  const categories = restaurant.categories.map((el, i) => el = el.title).join(', ');
  const address = restaurant.location.display_address.join(', ');
  const distance = Math.round(restaurant.distance * 0.00062137 * 10) / 10 + 'mile'
  const query = `INSERT IGNORE INTO favorite (userId, restaurantId, name, image_url, rating, price, phone, categories, address, review_count, distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  const values = [params.userId, restaurant.id, restaurant.name, restaurant.image_url, restaurant.rating, restaurant.price, restaurant.display_phone, categories, address, restaurant.review_count, distance];
  connection.query(query, values, (err, results, fields) => {
    (err) ? 
    console.error(err) :
    callback()
  })
}

const getFavorite = (userId, callback) => {
  const query = `SELECT * FROM favorite WHERE userId="${userId}";`;
  connection.query(query, (err, results, fields) => {
    (err) ? 
    console.error(err) :
    callback(results)
  })
}

const deleteFavorite = (restaurantId, userId, callback) => {
  const query = `DELETE FROM favorite WHERE restaurantId="${restaurantId}" AND userId="${userId}";`;
  connection.query(query, (err, results, fields) => {
    (err) ? 
    console.error(err) :
    callback(results)
  })
}

module.exports.getUser = getUser;
module.exports.saveUser = saveUser;
module.exports.saveFavorite = saveFavorite;
module.exports.getFavorite = getFavorite;
module.exports.deleteFavorite = deleteFavorite;