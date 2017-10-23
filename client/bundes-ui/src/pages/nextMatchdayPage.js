import React from 'react';

import { MatchesPage } from './matchesPage';
import { fetchNextMatchDay } from '../api';


export const NextMatchdayPage = (props) => {
   return (
      <MatchesPage
         {...props}
         fetchData={fetchNextMatchDay}
      />
   );
};