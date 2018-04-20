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

const api = require('../config.js');
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

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
