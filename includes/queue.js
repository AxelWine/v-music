const WineDB = require('wine-database');

const Song = require('./models/song.js');

let queue;

const initDB = async() => {
  try {
    queue = await WineDB.init('queue');
    queue.defineClass(Song);

    // Clear queues
    clearAll();
  } catch (error) {
    console.error('Error initializing queue:', error);
    throw error;
  }
};

/**
 * Add a song to the queue
 * @param {object} song - The song object
 * @param {string} serverId - The server ID
 * @returns {object} - The song object
 */
const addSong = (song, serverId) => {
  const songObj = new Song(song);
  songObj.server = serverId;
  queue.create(songObj);
};

/**
 * Get a song from the queue
 * @param {string} songId - The song ID
 * @returns {object} - The song object
 */
const getSong = songId => {
  return queue.get(songId);
};

/**
 * Remove a song from the queue
 * @param {string} songId - The song ID
 * @returns {object} - The song object
 */
const removeSong = songId => {
  return queue.delete(songId);
};

/**
 * Get all songs from the queue
 * @param {string} serverId - The server ID
 * @returns {array} - The song objects
 */
const get = serverId => {
  return queue.filter(x => x.server === serverId);
};

/**
 * Clear songs from the queue
 * @param {array} songsId - The song IDs
 */
const clear = async songsId => {
  for (const songId of songsId) queue.delete(songId);
};

/**
 * Clear all songs from the queue
 * @param {array} songsId - The song IDs
 */
const clearAll = async() => {
  const all = queue.getAll();
  for (const song of all) queue.delete(song.id);
};

initDB();

module.exports = {
  addSong,
  getSong,
  removeSong,
  get,
  clear,
  clearAll
};