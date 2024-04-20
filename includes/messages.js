const WineDB = require('wine-database');

const Message = require('./models/message.js');

let messages;

const initDB = async() => {
  try {
    messages = await WineDB.init('messages');
    messages.defineClass(Message);
  } catch (error) {
    console.error('Error initializing messages database:', error);
    throw error;
  }
};

initDB();

/**
 * Get a message by its ID
 * @param {string} messageId - The message ID
 * @returns {object} - The server object
 */
const get = messageId => {
  return messages.find(x => x.userMessage === messageId);
};

/**
 * Save a message to the database
 * @param {object} props - The message properties
 * @returns {object} - The saved message object
 */
const save = props => {
  return messages.create(new Message(props));
};

/**
 * Delete a message from the database
 * @param {string} messageId - The message ID
 */
const remove = messageId => {
  const message = get(messageId);
  if (message) messages.delete(message.id);
};

module.exports = {
  get,
  save,
  remove
};