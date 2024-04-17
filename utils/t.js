const { t } = require('i18next');

/**
 * Get a string from the language file.
 * @param {string} key The key of the string.
 * @param {string} lng The language to use.
 * @param {Object} args The arguments to replace in the string.
 * @returns {string}
 */
module.exports = (key, lng, args) => t(key, { lng, ...args });