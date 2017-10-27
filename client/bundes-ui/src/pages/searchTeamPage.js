import React from 'react';
import { Dropdown } from 'semantic-ui-react';

import { fetchAllSeason } from '../api';


export class SearchTeamPage extends React.Component {
   componentDidMount() {
      fetchAllSeason()
         .then((json) => {
            this.setState({ data: json });
            debugger;
         });
   }

   render() {
      const options = [
         {
            key: 'a',
            text: 'Aa',
            value: 'a',
         },
         {
            key: 'b',
            text: 'Bb',
            value: 'b',
         },
         {
            key: 'c',
            text: 'Cc',
            value: 'c',
         },
         {
            key: 'd',
            text: 'Dd',
            value: 'd',
         },
      ];

      return (
         <Dropdown search selection options={options}/>
      );
   }
}
