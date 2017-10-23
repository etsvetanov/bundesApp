import React from 'react';

import { MatchList } from '../components/matchList';

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



   render() {
      if (!this.state.data) return <p> Loading! </p>;

      return (
         <MatchList matches={this.state.data}/>
      )
   }
}


export { UpcomingMatches };