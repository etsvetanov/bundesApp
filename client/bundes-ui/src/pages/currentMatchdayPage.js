import React from 'react';

import { MatchesPage } from './matchesPage';
import { fetchCurrentMatchDay } from '../api';


export const CurrentMatchdayPage = (props) => {
   return (
      <MatchesPage
         {...props}
         fetchData={fetchCurrentMatchDay}
      />
   );
};