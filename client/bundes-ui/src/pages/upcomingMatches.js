import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

import { MatchList } from '../components/matchList';
import { fetchCurrentMatchDay } from '../api';


class UpcomingMatches extends React.Component {
   constructor() {
      super();

      this.state = {
         data: null,
      };
   }

   componentDidMount() {
      fetchCurrentMatchDay()
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
      // if (!this.state.data) return <p> Loading! </p>;

      return (
         <MatchList matches={this.state.data}/>
      )
   }
}


export { UpcomingMatches };