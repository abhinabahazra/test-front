import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';

import Passcode from './components/passcode';
import Details from './components/details';
import TestBox from './components/exam';
import Logout from './components/Logout';
import Thankyou from './components/ThankYou';

export class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Passcode}/>
            <Route exact path="/details" component={Details}/>
            <Route exact path="/test" component={TestBox}/>
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/thankyou" component={Thankyou} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
