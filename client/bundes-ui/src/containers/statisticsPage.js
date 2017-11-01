import React from 'react';
import { Table, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { getWinLossStatistics } from '../reducers/match';
import { fetchMatches } from '../actions/match';


class AllTeamsStatistics extends React.Component {
   componentDidMount() {
      if (!this.props.statistics.length) {
         this.props.fetchMatches();
      }
   }

   render() {
      if (!this.props.statistics.length) {
         return <Loader active inline='centered' />
      }

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
               {this.props.statistics.map((item) => {
                  return (
                     <Table.Row key={item.team}>
                        <Table.Cell> {item.team} </Table.Cell>
                        <Table.Cell> {item.wins}:{item.losses} </Table.Cell>
                     </Table.Row>
                  );
               })}
            </Table.Body>
         </Table>
      );
   }
}

const mapStateToProps = (state) => {
   return {
      statistics: getWinLossStatistics(state),
   };
};

const mapDispatchToProps = {
   fetchMatches,
};

export const StatisticsPage = connect(mapStateToProps, mapDispatchToProps)(AllTeamsStatistics);