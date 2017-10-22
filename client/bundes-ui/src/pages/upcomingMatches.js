import React from 'react';
import { Card, Image, Grid } from 'semantic-ui-react'
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
      }



      return (
         <Grid.Row centered key={match.MatchID}>

            <Grid.Column mobile={16} largeScreen={14} widescreen={12} color="blue">
               <h3 className="text-center">
                  { matchMoment.format('dddd, DD/MM/YYYY HH:MM')}
               </h3>
               <div className="text-center">
                  { match.Location.LocationStadium }
               </div>
            </Grid.Column>

            <Grid.Column mobile={8} largeScreen={7} widescreen={6}>
               <Card fluid>
                  <Card.Content>
                     <Card.Header textAlign="right">
                        {match.Team1.TeamName}
                     </Card.Header>
                     <Card.Meta textAlign="right">
                        { ScoreTeam1 !== undefined ? ScoreTeam1 : '-' }
                     </Card.Meta>
                  </Card.Content>
               </Card>
            </Grid.Column>

            <Grid.Column mobile={8} largeScreen={7} widescreen={6}>
               <Card fluid>
                  <Card.Content>
                     <Card.Header>
                        {match.Team1.TeamName}
                     </Card.Header>
                     <Card.Meta>
                        { ScoreTeam2 !== undefined ? ScoreTeam2 : '-' }
                     </Card.Meta>
                  </Card.Content>
               </Card>
            </Grid.Column>
         </Grid.Row>
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
            { this.state.data.map(this.renderMatch)}
         </Grid>
      )
   }
}


export { UpcomingMatches };