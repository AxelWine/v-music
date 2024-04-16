const WineDB = require('wine-database');

const Server = require('./models/server.js');

let servers;

const initDB = async() => {
  try {
    servers = await WineDB.init('servers');
    servers.defineClass(Server);
  } catch (error) {
    console.error('Error initializing queue:', error);
    throw error;
  }
};

initDB();

/**
 * Find a server in the database
 * @param {string} serverId - The server ID
 * @returns {object} - The server object
 */
const find = serverId => {
  return servers.find(x => x.server === serverId);
};

module.exports = {
  find
};