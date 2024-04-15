const ytSearch = require('youtube-sr').default;

module.exports = query => {
  return new Promise(async (resolve) => {
    ytSearch.search(query, { limit: 1 }).then(results => {
      resolve(results[0]);
    });
  });
};