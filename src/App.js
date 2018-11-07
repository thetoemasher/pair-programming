import React, { Component } from 'react';
import './App.css';
import {Switch, Route} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Cohort from './components/Cohort'
import Unauthorized from './components/Unauthorized'
import Nav from './components/Nav'
import {Div} from 'glamorous'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: null
    }
  }

  updateLoggedIn = (loggedIn) => {
    this.setState({loggedIn})
  }
  render() {
    return (
      <Div
        backgroundColor='#2aabe2'
        height='100vh' >
        <Nav />
          <Unauthorized updateLoggedIn={this.updateLoggedIn} loggedIn={this.state.loggedIn}>
              <Switch>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/cohort/:id" component={Cohort} />
              </Switch>
            </Unauthorized>
      </Div>
    );
  }
}

export default App;
