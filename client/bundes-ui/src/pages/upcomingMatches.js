import React from 'react';
import { Label, Segment, Grid } from 'semantic-ui-react'
import moment from 'moment';


class UpcomingMatches extends React.Component {
   constructor() {
      super();

      this.state = {
         data: null,
      };
   }

   componentDidMount() {
      fetch('https://www.openligadb.de/api/getmatchdata/bl1')
         .then((response) => {
            return response.json();
         })
         .then((json) => {
            this.setState({ data: json });
         });
   }

   renderMatch(match) {
      const matchMoment = moment(match.MatchDateTime);
      let ScoreTeam1, ScoreTeam2;

      if (match.Goals.length) {
         ({ ScoreTeam1, ScoreTeam2} = match.Goals[match.Goals.length - 1]);
      } else if (match.MatchIsFinished) {
          ScoreTeam1 = 0;
          ScoreTeam2 = 0;
      }

      const color = match.MatchIsFinished ? '' : 'green';

      return (
         <Segment.Group  raised key={match.MatchID}>

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
      )
   }


   render() {
      if (!this.state.data) return <p> Loading! </p>;

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
                  { this.state.data.map(this.renderMatch)}
               </Grid.Column>
            </Grid.Row>
         </Grid>
      )
   }
}


export { UpcomingMatches };