import {withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from'axios';
import { Paper, FlatButton, FontIcon, IconButton} from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import Search from './Search.jsx';
import RestaurantList from './RestaurantList.jsx';
import Filter from './Filter.jsx';
import Sort from './Sort.jsx';


class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      filtered: [],
      isFiltered: false,
      price1: false,
      price2: false,
      price3: false,
      price4: false
    }
    this.getRestaurants = this.getRestaurants.bind(this);
    this.filterRestaurants = this.filterRestaurants.bind(this);
    this.updatePrice1 = this.updatePrice1.bind(this);
    this.updatePrice2 = this.updatePrice2.bind(this);
    this.updatePrice3 = this.updatePrice3.bind(this);
    this.updatePrice4 = this.updatePrice4.bind(this);
    this.sortRestaurant = this.sortRestaurant.bind(this);
    this.saveFavorite = this.saveFavorite.bind(this);
    this.sendTo = this.sendTo.bind(this);
  }

  componentDidMount() {
    this.getRestaurants({params: {term: `Paleo`, location: 10017, radius: 20000}})
  }

  getRestaurants(params) {
    axios.get('/restaurants', params)
         .then((response) => {
           this.setState({
             restaurants: response.data.businesses,
             isFiltered: false
           })
         })
  }

  saveFavorite(restaurant) {
    axios.post('/favorite', {restaurant: restaurant, userId: this.props.location.userId})
         .then((response) => {
         })
  }

  sendTo(path) {
    this.props.history.push({
      pathname: path,
      // username: this.props.location.username,
      userId: this.props.location.userId
    })
  }

  updatePrice1() {
    this.setState({
      price1: !this.state.price1
    }, this.filterRestaurants)
  }

  updatePrice2() {
    this.setState({
      price2: !this.state.price2
    }, this.filterRestaurants)
  }

  updatePrice3() {
    this.setState({
      price3: !this.state.price3
    }, this.filterRestaurants)
  }

  updatePrice4() {
    this.setState({
      price4: !this.state.price4
    }, this.filterRestaurants)
  }

  sortRestaurant(value) {
    var restaurants = this.state.restaurants;
    var filtered = this.state.filtered;
    if (value === 1) {
      restaurants.sort((a, b) => a.price > b.price ? 1 : -1); 
      filtered.sort((a, b) => a.price > b.price ? 1 : -1); 
    } else if (value === 2) {
      restaurants.sort((a, b) => a.price < b.price ? 1 : -1); 
      filtered.sort((a, b) => a.price < b.price ? 1 : -1);
    } else if (value === 3) {
      restaurants.sort((a, b) => a.distance > b.distance ? 1 : -1); 
      filtered.sort((a, b) => a.distance > b.distance ? 1 : -1);
    } else if (value === 4) {
      restaurants.sort((a, b) => a.rating < b.rating ? 1 : -1); 
      filtered.sort((a, b) => a.rating < b.rating ? 1 : -1);
    } else if (value === 5) {
      restaurants.sort((a, b) => a.review_count < b.review_count ? 1 : -1); 
      filtered.sort((a, b) => a.review_count < b.review_count ? 1 : -1);
    }
    this.setState({
      restaurants: restaurants,
      filtered: filtered
    })
  }
  filterRestaurants() {
    var results = [];
    const restaurants = this.state.restaurants;
    var keys = ['price1', 'price2', 'price3', 'price4'];
    if (keys.every((key) => !this.state[key])) {
      this.setState({
        isFiltered: false
      })
    } else {   
      if (this.state.price1) {
        results = results.concat(restaurants.filter((restaurant) => restaurant.price === '$'))
      } 
      if (this.state.price2) {
        results = results.concat(restaurants.filter((restaurant) => restaurant.price === '$$'))
      } 
      if (this.state.price3) {
        results = results.concat(restaurants.filter((restaurant) => restaurant.price === '$$$'))
      }
      if (this.state.price4) {
        results = results.concat(restaurants.filter((restaurant) => restaurant.price === '$$$$'))      
      } 
      this.setState({
        filtered: results
      }, () => {
        this.setState({
          isFiltered: true
        })
      })
    }
  }

  render() {
    return (
      <div className="home">
        <div className="nav">
        <div className="search">
          <Search getRestaurants={this.getRestaurants}/>
        </div>
        <div className="icon-button">
          <IconButton 
            iconStyle={{fill: 'white'}}
            tooltip="Home" 
            // style={{float: 'right', marginRight: '50px'}}
            onClick={() => console.log('clicked')}
          >
            <ActionHome />
          </IconButton>
          <IconButton 
            tooltip="Favorites" 
            iconStyle={{fill: 'white'}}
            // style={{float: 'right', marginRight: '50px'}}
            onClick={() => this.sendTo('/favorite')}
          >
            <ActionFavorite />
          </IconButton>
        </div>
        </div>
        <div className="nav2">
        <div className="filter">
        <div className="paleo">
        Paleo-Friendly Restaruants
        </div>
        <Filter 
          updatePrice1={this.updatePrice1}
          updatePrice2={this.updatePrice2}
          updatePrice3={this.updatePrice3}
          updatePrice4={this.updatePrice4}
        />
        </div>
        <div className="sort">
        <Sort sortRestaurant={this.sortRestaurant}/>
        </div>
        </div>
        <RestaurantList 
          restaurants={this.state.isFiltered ? 
          this.state.filtered : this.state.restaurants}
          saveFavorite={this.saveFavorite}
        />
      </div>
    )
  }
}

export default withRouter(HomePage);