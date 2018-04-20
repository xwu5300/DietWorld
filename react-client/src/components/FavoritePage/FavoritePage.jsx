import {withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { AutoComplete, FlatButton, Paper, IconButton } from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';

import List from './List.jsx';

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
    this.sendTo = this.sendTo.bind(this);
    this.showFavorite = this.showFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {
    this.showFavorite(this.props.location.userId)
  }

  showFavorite(userId) {
    axios.get('/favorite', {params: {userId: userId}})
         .then((response) => {
           this.setState({
             favorites: response.data
           })
         })
  }

  deleteFavorite(favorite) {
    axios.post('/delete', {restaurantId: favorite.restaurantId, userId: favorite.userId})
         .then((response) => {
           this.showFavorite(this.props.location.userId)
         })
  }

  sendTo(path) {
    this.props.history.push({
      pathname: path,
      username: this.props.location.username,
      userId: this.props.location.userId
    })
  }

  render() {
    return (
      <Paper>
        <h1> My Favorites
        <IconButton 
            tooltip="Favorites" 
            iconStyle={{fill: '#EE4324'}}
            style={{float: 'right', marginRight: '50px'}}
          >
            <ActionFavorite />
          </IconButton>
          <IconButton 
            iconStyle={{fill: '#966EBD'}}
            tooltip="Home" 
            style={{float: 'right', marginRight: '50px'}}
            onClick={() => this.sendTo('/homepage')}
          >
            <ActionHome />
          </IconButton>
        </h1>
        <br/>
        <List favorites={this.state.favorites} deleteFavorite={this.deleteFavorite}/>
      </Paper>
    )
  }
}

export default withRouter(FavoritePage);
