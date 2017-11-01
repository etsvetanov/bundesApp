import { actionTypes } from "../actions/actionTypes";
import { combineReducers } from 'redux';
import { createSelector } from 'reselect';


export const byId = (state = {}, action) => {
   switch (action.type) {
      case actionTypes.team.FETCH_TEAMS_SUCCESS:
      case actionTypes.match.FETCH_MATCHES_SUCCESS:
         return {
            ...state,
            ...action.teams,
         };

      default:
         return state;
   }
};



export const team = combineReducers({
   byId,
});


// --- selectors ---

export const getTeamsById = (state) => state.team.byId;
export const getTeamsList = createSelector(
   getTeamsById,
   (teamsById) => Object.values(teamsById)
);

export const getSelectedTeamId = (state, props) => parseInt(props.match.params.id);

export const getTeamOptions = createSelector(
   getTeamsList,
   (teamsList) => teamsList.map(team => {
      return {
         key: team.TeamId,
         text: team.TeamName,
         value: team.TeamId,
      };
   })
);

export const getInitializedTeamStats = createSelector(
   getTeamsList,
   (teamsList) => teamsList.reduce((acc, val) => ({
      ...acc,
      [val.TeamId]: {
         wins: 0,
         losses: 0,
      },
   }), {})
);
