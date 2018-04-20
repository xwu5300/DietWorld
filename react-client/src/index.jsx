import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import LandingPage from './components/LandingPage/LandingPage.jsx';
import Registration from './components/LandingPage/Registration.jsx';
import HomePage from './components/HomePage/HomePage.jsx';
import FavoritePage from './components/FavoritePage/FavoritePage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <MuiThemeProvider>
        <Router>
          <Switch>
            <LandingPage exact path="/" component={LandingPage}/>
            <Registration exact path="/registration" component={Registration}/>
            <HomePage exact path="/homepage" component={HomePage}/>
            <FavoritePage exact path="/favorite" component={FavoritePage}/>
          </Switch>
        </Router>
      </MuiThemeProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));