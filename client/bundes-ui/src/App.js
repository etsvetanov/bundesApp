import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Menu, Grid } from 'semantic-ui-react';

import {
   BrowserRouter as Router,
   Route,
   Link
} from 'react-router-dom';


import {MatchesPage} from './pages/matchesPage';


class App extends Component {
   render() {
      return (
         <Router>
            <div>
               <Menu stackable>
                  <Menu.Item>
                     <img src='http://www.camdensundayleague.com/wp-content/uploads/2016/08/Football-300x300.jpg'/>
                  </Menu.Item>

                  <Menu.Item
                     name="Upcoming"
                  >
                     <Link to="/upcoming"> Upcoming </Link>
                  </Menu.Item>
               </Menu>
               <Grid>
                  <Grid.Row>
                     <Grid.Column>
                        <h1 className="text-center">
                           Upcoming matches
                        </h1>
                     </Grid.Column>
                  </Grid.Row>
                  <Grid.Row centered>
                     <Grid.Column mobile={16} largeScreen={14} widescreen={12}>
                        <Route path="/upcoming" component={MatchesPage} test={{a:5}} />
                     </Grid.Column>
                  </Grid.Row>
               </Grid>
            </div>
         </Router>
      );
   }
}

export default App;
