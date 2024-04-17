const Discord = require('discord.js');

const getColor = require('./getColor');

/**
 * Create a bot embed message.
 * @param {string} content The message content.
 * @param {Discord.TextChannel} channel The channel to send the message.
 * @param {string} type The type of the message.
 */
module.exports = (content, type) => {
  if (!content) return Promise.reject(new Error('Content is required'));
  if (typeof content !== 'string') return Promise.reject(new Error('Content must be a string'));

  const embed = new Discord.EmbedBuilder()
    .setColor(getColor(type))
    .setTitle(content.substring(0, 256))

  return embed;
};