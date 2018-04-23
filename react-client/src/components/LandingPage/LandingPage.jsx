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
    this.props.updateUsername(this.state.username);
  }
  
  sendTo(path, username = '', userId = '') {
    this.props.history.push({
      pathname: path,
      // username: this.props.name,
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
      <div className="landing">
      <div className="landing-paper">

        <h1> Diet World </h1>
        <AutoComplete
          inputStyle={{color: "white", fontWeight: "5px", fontSize: "25px"}}
          dataSource={[]}
          hintText='Username'
          ref={'autocomplete'}
          onUpdateInput={this.updateInput}
          onNewRequest={this.handleLogin}
        />

        <FlatButton
          style={{color: "white"}}
          primary={true}
          label='Login'
          onClick={this.handleLogin}
        />

        <FlatButton
          style={{color: "white"}}
          primary={true}
          label='Register'
          onClick={() => {this.sendTo('/registration')}}
        />

      </div>
      </div>
    )
  }
}


export default withRouter(LandingPage);