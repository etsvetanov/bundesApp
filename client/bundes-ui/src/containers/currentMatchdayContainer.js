import { connect } from 'react-redux';

import { getCurrentMatchdayMatches } from '../reducers/match';
import { fetchCurrentGroup, fetchMatches } from '../actions/match';
import { MatchesPage } from './matchesPage'


const mapStateToProps = (state) => {
   return {
      matches: getCurrentMatchdayMatches(state),
      header: 'Current matchday',
   };
};

const mapDispatchToProps = {
   fetchCurrentGroup,
   fetchMatches,
};

export const CurrentMatchdayContainer = connect(mapStateToProps, mapDispatchToProps)(MatchesPage);

