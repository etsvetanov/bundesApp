import { actionTypes } from '../actions';
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import { getInitializedTeamStats } from './team';
import { getTeamsById, getSelectedTeamId } from './team';


export const byId = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.match.FETCH_MATCHES_SUCCESS:
         return {
            ...state,
            ...action.matches,
         };

      default:
         return state;
   }
};

export const isLoading = (state = true, action) => {
   switch (action.type) {
      case actionTypes.match.FETCH_MATCHES_ERROR:
      case actionTypes.match.FETCH_MATCHES_SUCCESS:
         return false;

      case actionTypes.match.FETCH_MATCHES_REQUEST:
         return true;

      default:
         return state;
   }
};

export const match = combineReducers({
   byId,
   isLoading,
});


// --- selectors ---

export const getMatchesById = (state) => state.match.byId;
export const getMatchById = (state, id) => state.match.byId[id];
export const getMatchesList = (state) => Object.values(state.match.byId);


export const getUpcomingMatchesByTeam = createSelector(
   getMatchesList,
   getTeamsById,
   getSelectedTeamId,
   (matchesList, teamsById, selectedTeamId) => {
      const nowJSON = new Date().toJSON();

      const futureTeamMatches = matchesList
         .filter(match => match.MatchDateTime > nowJSON)
         .filter(match => [match.Team1, match.Team2].includes(selectedTeamId));

      return futureTeamMatches.map(match => ({
         ...match,
         Team1: teamsById[match.Team1],
         Team2: teamsById[match.Team2],
      }));
   }
);


export const getWinLossRatio = createSelector(
   getMatchesList,
   getInitializedTeamStats,
   (matches, initializedStatsByTeam) => {

      return matches.reduce((statsByTeam, match, idx, array) => {
         const lastGoal = match.Goals[match.Goals.length - 1];

         if (!match.MatchIsFinished || !lastGoal) {
            return statsByTeam;
         } else {
            const { ScoreTeam1, ScoreTeam2 } = lastGoal;

            if (ScoreTeam1 === ScoreTeam2) return statsByTeam;

            const { Team1, Team2 } = match;

            const [winningTeam, losingTeam] = ScoreTeam1 > ScoreTeam2 ? [Team1, Team2] : [Team2, Team1];


            statsByTeam[winningTeam].wins++;
            statsByTeam[losingTeam].losses++;

            return statsByTeam;
         }
      }, initializedStatsByTeam);
   }
);

export const getWinLossRationByTeamId = (state, teamId) => getWinLossRatio(state)[teamId];
