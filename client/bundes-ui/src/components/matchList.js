import React from 'react';
import { Grid } from 'semantic-ui-react'

import { MatchItem } from './matchItem';


export function MatchList({ matches }) {
   return (
      <Grid>
         <Grid.Row>
            <Grid.Column>
               <h1 className="text-center">
                  Upcoming matches
               </h1>
            </Grid.Column>
         </Grid.Row>
         <Grid.Row centered>
            <Grid.Column  mobile={16} largeScreen={14} widescreen={12} >
               { matches.map((match) => <MatchItem key={match.MatchID} match={match}/>) }
            </Grid.Column>
         </Grid.Row>
      </Grid>
   )
}