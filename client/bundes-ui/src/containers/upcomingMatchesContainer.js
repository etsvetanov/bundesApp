import React from 'react';
import { connect } from 'react-redux';

import { MatchList } from '../components/matchList';
import { getNextMatchdayMatches } from '../reducers/match';
import { fetchCurrentGroup, fetchMatches } from '../actions/match';


class UpcomingMatchesContainer extends React.Component {
   componentDidMount() {
      if (this.props.matches === null) {
         this.props.fetchCurrentGroup();
      } else if (this.props.matches.length === 0) {
         this.props.fetchMatches();
      }
   }

   render() {
      if (this.props.matches === null || this.props.matches.length === 0) {
         return <h1> LOADING </h1>;
      }

      return (
         <MatchList matches={this.props.matches} />
      );
   }
}

const mapStateToProps = (state) => {
   return {
      matches: getNextMatchdayMatches(state),
   };
};

const mapDispatchToProps = {
   fetchCurrentGroup,
   fetchMatches,
};

UpcomingMatchesContainer = connect(mapStateToProps, mapDispatchToProps)(UpcomingMatchesContainer);

export { UpcomingMatchesContainer };