import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Loader } from 'semantic-ui-react';

import { fetchMatches } from '../actions/match';
import { getWinLossRatioByTeamId, getUpcomingMatchesByTeam } from '../reducers/match';
import { MatchList } from '../components/matchList';
import { withRouter } from 'react-router-dom';


class TeamPage extends React.Component {
   componentDidMount() {
      this.props.fetchMatches();
   }

   render() {
      const { winLossRatios } = this.props;

      if (!winLossRatios) {
         return <Loader active inline='centered' />
      }

      return (
         <div>
            <div className="team-statistics-container">
               <Statistic>
                  <Statistic.Label>Wins</Statistic.Label>
                  <Statistic.Value>{ winLossRatios.wins }</Statistic.Value>
               </Statistic>
               <Statistic>
                  <Statistic.Label>Losses</Statistic.Label>
                  <Statistic.Value>{ winLossRatios.losses }</Statistic.Value>
               </Statistic>
            </div>

            <MatchList matches={this.props.upcomingMatches}/>
         </div>
      );
   }
}

const mapStateToProps = (state, ownProps) => {
   const teamId = ownProps.match.params.id;

   return {
      winLossRatios: getWinLossRatioByTeamId(state, teamId),
      upcomingMatches: getUpcomingMatchesByTeam(state, ownProps),
   };
};

const mapDispatchToProps = {
   fetchMatches,
};

TeamPage = withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamPage));

export { TeamPage };