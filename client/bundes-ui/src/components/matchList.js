import React from 'react';

import { MatchItem } from './matchItem';


export function MatchList({ matches }) {
   return (
      <div>
         { matches.map((match) => <MatchItem key={match.MatchID} match={match}/>) }
      </div>
   )
}