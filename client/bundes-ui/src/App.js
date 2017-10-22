import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';


import { UpcomingMatches } from './pages/upcomingMatches';


class App extends Component {
  render() {
    return (
        <Router>

          <Route path="/upcoming" component={UpcomingMatches} />
        </Router>
    );
  }
}

export default App;
