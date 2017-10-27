import React from 'react';
import { Table } from 'semantic-ui-react';

import { fetchAllSeason } from '../api';


class StatisticsPage extends React.Component {
   constructor() {
      super();

      this.state = {
         data: null,
      };
   }

   componentDidMount() {
      this.props.fetchData()
         .then((matches) => {
            const winsByTeam = {};

            matches.forEach((match) => {
               if (match.MatchIsFinished && match.Goals.length) {
                  const {ScoreTeam1, ScoreTeam2} = match.Goals[match.Goals.length - 1];

                  if (winsByTeam[match.Team1.TeamName] === undefined) {
                     winsByTeam[match.Team1.TeamName] = {
                        win: 0,
                        loss: 0,
                     };
                  }

                  if (winsByTeam[match.Team2.TeamName] === undefined) {
                     winsByTeam[match.Team2.TeamName] = {
                        win: 0,
                        loss: 0,
                     };
                  }

                  if (ScoreTeam1 > ScoreTeam2) {
                     winsByTeam[match.Team1.TeamName].win++;
                     winsByTeam[match.Team2.TeamName].loss++;
                  } else if (ScoreTeam1 < ScoreTeam2) {
                     winsByTeam[match.Team2.TeamName].win++;
                     winsByTeam[match.Team1.TeamName].loss++;
                  }
               }
            });

            this.setState({
               data: winsByTeam,
            });

         });
   }

   render() {
      if (this.state.data === null) return null;

      const { data } = this.state;

      return(
         <Table unstackable celled>
            <Table.Header>
               <Table.Row>
                  <Table.HeaderCell>
                     Team
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                     Win/Loss Ratio
                  </Table.HeaderCell>
               </Table.Row>
            </Table.Header>
            <Table.Body>
               {Object.keys(data).map((team) => {
                  return (
                     <Table.Row key={team}>
                        <Table.Cell> {team} </Table.Cell>
                        <Table.Cell> {`${data[team].win}:${data[team].loss}`} </Table.Cell>
                     </Table.Row>
                  );
               })}
            </Table.Body>
         </Table>
      );
   }
}

export const AStatisticsPage = (props) => {
   return (
      <StatisticsPage
         {...props}
         fetchData={fetchAllSeason}
      />
   )
};