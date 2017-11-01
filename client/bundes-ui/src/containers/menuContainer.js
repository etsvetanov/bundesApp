import React from 'react';
import { connect } from 'react-redux';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import { getTeamOptions } from '../reducers/team';
import { fetchMatches } from '../actions/match';


class BundesMenu extends React.Component {
   componentDidMount() {
      this.props.fetchMatches();
   }

   render() {
      return (
         <Menu stackable>
            <Menu.Item>
               <img src='http://www.camdensundayleague.com/wp-content/uploads/2016/08/Football-300x300.jpg' alt="Football"/>
            </Menu.Item>
            <Menu.Item
               name="current"
            >
               <Link to="/current"> Current </Link>
            </Menu.Item>

            <Menu.Item
               name="upcoming"
            >
               <Link to="/next"> Upcoming </Link>
            </Menu.Item>

            <Menu.Item
               name="statistics"
            >
               <Link to="/statistics"> Statistics </Link>
            </Menu.Item>

            <Menu.Item
               name="search"
            >
               <Dropdown
                  className="menu-search-input"
                  placeholder="Find team..."
                  fluid
                  search
                  selection
                  options={this.props.teamOptions}
                  onChange={(event, data) => this.props.history.push(`/team/${data.value}`)}
               />
            </Menu.Item>
         </Menu>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      teamOptions: getTeamOptions(state),
   };
};

const mapDispatchToProps = {
    fetchMatches,
};

export const MenuContainer = connect(mapStateToProps, mapDispatchToProps)(withRouter(BundesMenu));