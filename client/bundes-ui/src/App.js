import React, {Component} from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';

import {
   BrowserRouter as Router,
   Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';

import { CurrentMatchdayContainer, NextMatchdayContainer, StatisticsPage, TeamPage } from './containers';
import { MenuContainer } from './containers/menuContainer';


class App extends Component {
   render() {
      return (
         <Provider store={this.props.store}>
            <Router>
               <div>
                  <MenuContainer/>
                  <Grid>
                     <Grid.Row centered>
                        <Grid.Column mobile={16} largeScreen={14} widescreen={12}>
                           <Route path="/current" component={CurrentMatchdayContainer} />
                           <Route path="/next" component={NextMatchdayContainer} />
                           <Route path="/statistics" component={StatisticsPage} />
                           <Route path="/team/:id" component={TeamPage} />
                        </Grid.Column>
                     </Grid.Row>
                  </Grid>
               </div>
            </Router>
         </Provider>
      );
   }
}

export default App;
