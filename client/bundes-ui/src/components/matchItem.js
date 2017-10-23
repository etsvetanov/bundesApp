import React from 'react';
import { Label, Segment } from 'semantic-ui-react';
import moment from 'moment';


export function MatchItem({ match }) {
   const matchMoment = moment(match.MatchDateTime);
   let ScoreTeam1, ScoreTeam2;

   if (match.Goals.length) {
      ({ ScoreTeam1, ScoreTeam2} = match.Goals[match.Goals.length - 1]);
   } else if (match.MatchIsFinished) {
       ScoreTeam1 = 0;
       ScoreTeam2 = 0;
   }

   const color = match.MatchIsFinished ? undefined : 'green';

   return (
      <Segment.Group raised>

         <Segment color={color}>
            <h3 className="text-center">
               { matchMoment.format('dddd, DD/MM/YYYY HH:MM')}
            </h3>
            <div className="text-center">
               { match.Location.LocationStadium }
            </div>
         </Segment>

         <Segment.Group horizontal>
            <Segment textAlign="right" className="half-width">
               <span>{match.Team1.TeamName} </span>
               <div>
                  <Label circular color="grey" >{ ScoreTeam1 !== undefined ? ScoreTeam1 : '-' } </Label>
               </div>
            </Segment>

            <Segment className="half-width">
               {match.Team2.TeamName}
               <div>
                  <Label circular color="grey">{ ScoreTeam2 !== undefined ? ScoreTeam2 : '-' }</Label>
               </div>
            </Segment>
         </Segment.Group>
      </Segment.Group>
   );
}