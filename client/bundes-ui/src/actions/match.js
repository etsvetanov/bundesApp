import { actionTypes } from './actionTypes';
import { normalize } from 'normalizr';

import * as webApi from '../api'
import { matchesSchema } from '../schemas';


export const fetchMatches = () => (dispatch) => {
   dispatch({
      type: actionTypes.match.FETCH_MATCHES_REQUEST,
   });

   webApi.fetchMatchesInCurrentSeason()
      .then((matches) => {
         const normalizedData = normalize(matches, matchesSchema);

         dispatch({
            type: actionTypes.match.FETCH_MATCHES_SUCCESS,
            matches: normalizedData.entities.matches,
            teams: normalizedData.entities.teams,
         });
      })
      .catch(() => {
         dispatch({
            type: actionTypes.match.FETCH_MATCHES_ERROR,
         });
      });
};

export const fetchCurrentGroup = () => (dispatch) => {
   webApi.fetchCurrentGroup()
      .then((currentGroup) => {
         dispatch({
            type: actionTypes.match.FETCH_CURRENT_GROUP_SUCCESS,
            currentGroup,
         });
      });
};

