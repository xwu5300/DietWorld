const mysql = require('mysql');

const connection = mysql.createConnection({
  host     : 'us-cdbr-iron-east-05.cleardb.net',
  user     : 'b7224f0ec787b2',
  password : '49258c2c',
  database : 'heroku_a40acc849b598ad'
});

// const connection = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   database : 'dietWorld'  
// });

//Only use below function for the first time to create database and tables.
// connection.connect((err) => {
//   const sql = "CREATE DATABASE IF NOT EXISTS heroku_a40acc849b598ad;" 
//   const sql1 = "USE heroku_a40acc849b598ad;"
//   const sql2 = "CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL);"
//   const sql3 =  "CREATE TABLE IF NOT EXISTS favorite (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,userId INT,restaurantId VARCHAR(255) UNIQUE KEY,name VARCHAR(255),image_url VARCHAR(255),rating INT(11),price VARCHAR(11),phone VARCHAR(255),categories VARCHAR(255),address VARCHAR(255),review_count INT(11),distance VARCHAR(255));"
//   connection.query(sql, (err, results) => {
//     (err) ?
//     console.error(err) :
//     connection.query(sql1, (err, results) => {
//       (err) ?
//       console.error(err) :
//       connection.query(sql2, (err, results) => {
//         (err) ?
//         console.error(err) :
//         console.log('connected')
//       })
//       connection.query(sql3, (err, results) => {
//         (err) ? 
//         console.error(err) :
//         console.log('created')
//       })
//     })
//   })
// })



const getUser = (username, callback) => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  const query = `SELECT * FROM users WHERE name="${username}";`;
  connection.query(query, (err, results, fields) => {
    (err) ? 
    console.error(err) : 
    callback(results)
  })
}

const saveUser = (username, callback) => {
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
  const query = `INSERT INTO users (name) VALUES (?);`;
  connection.query(query, [username], (err, results, fields) => {
    (err) ?
    console.error(err) :
    callback(results)
  })
}

// const saveFavorite = (params, callback) => {
//   const restaurant = params.restaurant;
//   const categories = restaurant.categories.map((el, i) => el = el.title).join(', ');
//   const address = restaurant.location.display_address.join(', ');
//   const distance = Math.round(restaurant.distance * 0.00062137 * 10) / 10 + 'mile'
//   const query = `INSERT IGNORE INTO favorite (userId, restaurantId, name, image_url, rating, price, phone, categories, address, review_count, distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
//   const values = [params.userId, restaurant.id, restaurant.name, restaurant.image_url, restaurant.rating, restaurant.price, restaurant.display_phone, categories, address, restaurant.review_count, distance];
//   connection.query(query, values, (err, results, fields) => {
//     (err) ? 
//     console.error(err) :
//     callback()
//   })
// }

const saveFavorite = (params, callback) => {
  connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
});
  const restaurant = params.restaurant;
  const categories = restaurant.categories.map((el, i) => el = el.title).join(', ');
  const address = restaurant.location.display_address.join(', ');
  const distance = Math.round(restaurant.distance * 0.00062137 * 10) / 10 + 'mile'
  const query = `INSERT INTO favorite (userId, restaurantId, name, image_url, rating, price, phone, categories, address, review_count, distance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,?);`;
  const values = [params.userId, restaurant.id, restaurant.name, restaurant.image_url, restaurant.rating, restaurant.price, restaurant.display_phone, categories, address, restaurant.review_count, distance];
  connection.query(query, values, (err, results, fields) => {
    (err) ? 
    console.error(err) :
    callback()
  })
}

const getFavorite = (userId, callback) => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
  const query = `SELECT * FROM favorite WHERE userId="${userId}";`;
  connection.query(query, (err, results, fields) => {
    (err) ? 
    console.error(err) :
    callback(results)
  })
}

const deleteFavorite = (restaurantId, userId, callback) => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
  });
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