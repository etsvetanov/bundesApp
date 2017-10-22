import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Menu} from 'semantic-ui-react';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


import {UpcomingMatches} from './pages/upcomingMatches';


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
                    <Route path="/upcoming" component={UpcomingMatches}/>
                </div>
            </Router>
        );
    }
}

export default App;
