const database = require('../includes/database.js');
const config = require('../config.json');

/**
 * Get the language of the server.
 * @param {string} serverId The ID of the server.
 * @returns {string}
 */
module.exports = serverId => {
  const server = database.servers.find(x => x.server === serverId);
  return server ? server.lang : config.defaultLanguage;
};