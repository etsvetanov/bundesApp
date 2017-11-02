import { connect } from 'react-redux';

import { getNextMatchdayMatches } from '../reducers/match';
import { fetchCurrentGroup, fetchMatches } from '../actions/match';
import { MatchesPage } from './matchesPage'


const mapStateToProps = (state) => {
   return {
      matches: getNextMatchdayMatches(state),
      header: 'Next matchday',
   };
};

const mapDispatchToProps = {
   fetchCurrentGroup,
   fetchMatches,
};

export const NextMatchdayContainer = connect(mapStateToProps, mapDispatchToProps)(MatchesPage);

