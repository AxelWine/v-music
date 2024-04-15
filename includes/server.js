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

module.exports = servers;