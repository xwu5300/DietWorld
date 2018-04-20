const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const {
  getUser,
  saveUser,
  saveFavorite,
  getFavorite,
  deleteFavorite
} = require('../database-mysql');

const api = 'Bearer lAgY3pqIOvHB9zsYzUC9eCYPoitCXHFvEjmFJ1gHAsc5PHiy7JDrQrjtVn8eYbCBRkqiIkA-Bv7w0xTmQ0NdC9-IYJxG9Y4P6PgeO4lMxy4s6r5rbZ4YUGl4M_vUWnYx';
const app = express();
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const username = req.body.username;
  getUser(username, (results) => {
    if (results.length) {
      res.send(results);
    } else {
      res.send(false);
    }
  })
})

app.post('/register', (req, res) => {
  const username = req.body.username;
  getUser(username, (results) => {
    if (results.length) {
      res.send(true);
    } else {
      saveUser(username, () => {
        res.send(false);
      })
    }
  })
})
 
app.get('/restaurants', (req, res) => {
  const url = 'https://api.yelp.com/v3/businesses/search';
  axios.get(url, {headers: {Authorization: api}, params: req.query})
  .then((response) => {
    res.send(response.data)
  })
  .catch((err) =>{
    console.log('errr from yelp to server', err)
  })
});

app.post('/favorite', (req, res) => {
  saveFavorite(req.body, () => {
    res.send()
  })
})

app.get('/favorite', (req, res) => {
  getFavorite(req.query.userId, (results) => {
    res.send(results)
  })
})

app.post('/delete', (req, res) => {
  deleteFavorite(req.body.restaurantId, req.body.userId, (results) => {
    res.send()
  })
})

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), function() {
  console.log('listening on port 3000!');
});
