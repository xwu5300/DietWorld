import {withRouter} from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import axios from'axios';
import { AutoComplete, FlatButton, Paper } from 'material-ui';

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.updateInput = this.updateInput.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.sendTo = this.sendTo.bind(this);
  }

  updateInput(input) {
    this.setState({
      username: input
    })
  }

  sendTo(path, username) {
    this.props.history.push({
      pathname: path,
      username: username
    })
  }

  handleRegistration() {
    const username = this.state.username;
    axios.post('/register', {username})
         .then((response) => {
           if (response.data) {
             this.refs['autocomplete'].setState({searchText: ''});
             window.alert('Username already exists.')
           } else {
             this.sendTo('/homepage', username)
           }
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
          ref={'autocomplete'}
          hintText='New User'
          onUpdateInput={this.updateInput}
          onNewRequest={this.handleRegistration}
        />

        <FlatButton
          style={{color: "white"}}
          primary={true}
          label='Register'
          onClick={this.handleRegistration}
        />
      </div>
      </div>
    )
  }
}

export default withRouter(Registration)