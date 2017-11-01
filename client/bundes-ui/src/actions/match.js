import { actionTypes } from './actionTypes';
import { normalize } from 'normalizr';

import { fetchMatchesInCurrentSeason } from '../api'
import { matchesSchema } from '../schemas';


export const fetchMatches = () => (dispatch) => {
   dispatch({
      type: actionTypes.match.FETCH_MATCHES_REQUEST,
   });

   fetchMatchesInCurrentSeason()
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

