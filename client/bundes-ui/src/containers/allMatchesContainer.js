import { connect } from 'react-redux';

import { getMatchesList } from '../reducers/match';
import { fetchMatches } from "../actions/match";
import {MatchesPage} from "./matchesPage";

const mapStateToProps = (state) => {
    return {
       matches: getMatchesList(state),
    };
};

const mapDispatchToProps = {
   fetchMatches,
};

export const AllMatchesContainer = connect(mapStateToProps, mapDispatchToProps)(MatchesPage);