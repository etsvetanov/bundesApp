import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import { MatchList } from '../components/matchList';


class MatchesPage extends React.Component {
   constructor() {
      super();

      this.state = {
         data: null,
      };
   }

   componentDidMount() {
      this.props.fetchData()
         .then((json) => {
            this.setState({ data: json });
         });
   }

   render() {
      if (!this.state.data) {
         return (
            <Dimmer active page>
               <Loader> Fetching data </Loader>
            </Dimmer>
         )
      }

      return (
         <MatchList matches={this.state.data}/>
      )
   }
}


export { MatchesPage };