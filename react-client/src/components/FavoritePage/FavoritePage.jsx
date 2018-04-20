import {withRouter} from 'react-router-dom';
import React, { Component } from 'react';
import axios from 'axios';
import { AutoComplete, FlatButton, Paper, IconButton } from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import List from './List.jsx';

class FavoritePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: []
    }
    this.sendTo = this.sendTo.bind(this);
    this.showFavorite = this.showFavorite.bind(this);
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
          //  console.log('favorite from server to favorite', response)
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
            style={{float: 'right', marginRight: '50px'}}
          >
            <ActionGrade />
          </IconButton>
          <IconButton 
            tooltip="Home" 
            style={{float: 'right', marginRight: '50px'}}
            onClick={() => this.sendTo('/homepage')}
          >
            <ActionHome />
          </IconButton>
        </h1>
        <br/>
        <List favorites={this.state.favorites}/>
      </Paper>
    )
  }
}

export default withRouter(FavoritePage);
