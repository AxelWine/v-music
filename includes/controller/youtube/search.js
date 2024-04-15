const ytSearch = require('youtube-sr').default;

module.exports = query => {
  return new Promise(async (resolve, reject) => {
    if (!query) return reject(new Error('Query is required'));
    if (typeof query !== 'string') return reject(new Error('Query must be a string'));

    ytSearch.search(query, { limit: 1 }).then(results => {
      resolve(results[0]);
    });
  });
};