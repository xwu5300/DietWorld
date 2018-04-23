import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LandingPage from './components/LandingPage/LandingPage.jsx';
import Registration from './components/LandingPage/Registration.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import FavoritePage from './components/FavoritePage/FavoritePage.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(username) {
    this.setState({
      username: username
    })
  }



  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <LandingPage exact path="/" 
              component={LandingPage} 
              updateUsername={this.updateUsername} 
              name={this.state.username}
            />
            <Registration exact path="/registration" component={Registration} name={this.state.username}/>
            <HomePage exact path="/homepage" component={HomePage} name={this.state.username}/>
            <FavoritePage exact path="/favorite" component={FavoritePage} name={this.state.username}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));