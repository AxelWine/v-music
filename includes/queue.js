const WineDB = require('wine-database');

const Song = require('./models/song.js');

let queue;

const initDB = async() => {
  try {
    queue = await WineDB.init('queue');
    queue.defineClass(Song);
  } catch (error) {
    console.error('Error initializing queue:', error);
    throw error;
  }
};

const addSong = (song, serverId) => {
  const songObj = new Song(song);
  songObj.server = serverId;
  return queue.create(songObj);
};

const getSong = (songId) => {
  return queue.get(songId);
};

const removeSong = (songId) => {
  return queue.delete(songId);
};

const get = (serverId) => {
  return queue.filter({ server: serverId });
};

const clear = async(songsId) => {
  for (const songId of songsId) queue.delete(songId);
};

initDB();

module.exports = {
  addSong,
  getSong,
  removeSong,
  get,
  clear
};