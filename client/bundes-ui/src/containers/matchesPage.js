import React from 'react';
import { Loader } from 'semantic-ui-react';

import { MatchList } from '../components/matchList';


class MatchesPage extends React.Component {
   componentDidMount() {
      if (this.props.matches === null) {
         this.props.fetchCurrentGroup();
      } else if (this.props.matches.length === 0) {
         this.props.fetchMatches();
      }
   }

   render() {
      if (this.props.matches === null || this.props.matches.length === 0) {
         return <Loader active inline='centered' />
      }

      return (
         <div>
            <h1 className="text-center">
               {this.props.header}
            </h1>
            <MatchList matches={this.props.matches} />
         </div>


      );
   }
}


export { MatchesPage };