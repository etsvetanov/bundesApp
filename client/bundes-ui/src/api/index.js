export const fetchCurrentMatchDay = () => {
   return fetch('https://www.openligadb.de/api/getmatchdata/bl1')
      .then((response) => {
         return response.json();
      });
};