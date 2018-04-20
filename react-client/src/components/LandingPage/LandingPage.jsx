import {withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from'axios';
import { AutoComplete, FlatButton, Paper } from 'material-ui';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.updateInput = this.updateInput.bind(this);
    this.sendTo = this.sendTo.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  updateInput(input) {
    this.setState({
      username: input
    })
  }
  
  sendTo(path, username = '', userId = '') {
    this.props.history.push({
      pathname: path,
      username: username,
      userId: userId
    })
  }

  handleLogin() {
    const username = this.state.username;
    axios.post('/login', {username})
         .then((response) => {
           if(response.data) {
             this.sendTo('/homepage', username, response.data[0].id)
           } else {
             this.refs['autocomplete'].setState({searchText: ''});
             window.alert('Username does not exist.');
           }
         })
         .catch((err) => {
           console.log('Error:', err)
         })

  }

  render() {
    return (
      <Paper>

        <h3> Welcome To Diet World </h3>
        <AutoComplete
          dataSource={[]}
          hintText='Username'
          ref={'autocomplete'}
          onUpdateInput={this.updateInput}
          onNewRequest={this.handleLogin}
        />

        <FlatButton
          // style={buttonStyle}
          label='Login'
          onClick={this.handleLogin}
        />

        <FlatButton
          // style={buttonStyle}
          label='Register'
          onClick={() => {this.sendTo('/registration')}}
        />

      </Paper>
    )
  }
}


export default withRouter(LandingPage);