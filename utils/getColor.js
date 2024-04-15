const jsonfile = require('jsonfile');

const config = jsonfile.readFileSync('config.json');

/**
 * Get the color for the message type.
 * @param {string} type The type of the message.
 * @returns {string}
 */
module.exports = (type) => config.colors[type] || config.colors.default;