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

export const currentMatchday = (state = null, action) => {
   switch (action.type) {
      case actionTypes.match.FETCH_CURRENT_GROUP_SUCCESS:
         return action.currentGroup.GroupOrderID;

      default:
         return state;
   }
};

export const match = combineReducers({
   byId,
   currentMatchday,
});


// --- selectors ---

export const getMatchesById = (state) => state.match.byId;
export const getMatchById = (state, id) => state.match.byId[id];
export const getMatchesList = (state) => Object.values(state.match.byId);
export const getCurrentMatchday = (state) => state.match.currentMatchday;

export const _getNextMatchdayMatches = createSelector(
   getCurrentMatchday,
   getMatchesList,
   getTeamsById,
   (currentMatchday, matchesList) => {
      if (currentMatchday === null) {
         return null;
      }

      return matchesList
         .filter(match => match.Group.GroupOrderID === currentMatchday + 1);
   }
);


export const _getUpcomingMatchesByTeam = createSelector(
   getMatchesList,
   getTeamsById,
   getSelectedTeamId,
   (matchesList, teamsById, selectedTeamId) => {
      const nowJSON = new Date().toJSON();

      return matchesList
         .filter(match => match.MatchDateTime > nowJSON)
         .filter(match => [match.Team1, match.Team2].includes(selectedTeamId));
   }
);

export const makeNormalizedMatchesSelector = (selector) => {
   debugger;
   return createSelector(
      selector,
      getTeamsById,
      (selectorResult, teamsById) => {
         if (selectorResult === null) {
            return null;
         }

         return selectorResult.map(match => ({
            ...match,
            Team1: teamsById[match.Team1],
            Team2: teamsById[match.Team2],
         }));
      }
   );
};

export const getNextMatchdayMatches = makeNormalizedMatchesSelector(_getNextMatchdayMatches);
export const getUpcomingMatchesByTeam = makeNormalizedMatchesSelector(_getUpcomingMatchesByTeam);


export const getWinLossRatio = createSelector(
   getMatchesList,
   getInitializedTeamStats,
   (matches, initializedStatsByTeam) => {
      return matches.reduce((statsByTeam, match) => {
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

export const getWinLossRatioByTeamId = (state, teamId) => getWinLossRatio(state)[teamId];
export const getWinLossStatistics = createSelector(
   getWinLossRatio,
   getTeamsById,
   (winLossRatio, teamsById) => {
      return Object.keys(winLossRatio).map(teamId => ({
         team: teamsById[teamId].TeamName,
         wins: winLossRatio[teamId].wins,
         losses: winLossRatio[teamId].losses,
      }));
   }
);
