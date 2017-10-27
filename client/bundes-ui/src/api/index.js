

export const fetchCurrentMatchDay = () => {
   return fetch('https://www.openligadb.de/api/getmatchdata/bl1')
      .then((response) => {
         return response.json();
      });
};

export const fetchNextMatchDay = () => {
   return fetch('https://www.openligadb.de/api/getcurrentgroup/bl1')
      .then((response) => {
         return response.json();
      })
      .then((json) => {
         const nextMatchDayId = json.GroupOrderID + 1;
         const currentYear = new Date().getUTCFullYear();

         return fetch(`https://www.openligadb.de/api/getmatchdata/bl1/${currentYear}/${nextMatchDayId}`);
      })
      .then((response) => {
         return response.json();
      });
};

export const fetchAllSeason = () => {
   const currentYear = new Date().getUTCFullYear();

   return fetch(`https://www.openligadb.de/api/getmatchdata/bl1/${currentYear}`)
      .then((response) => {
         return response.json();
      });
};