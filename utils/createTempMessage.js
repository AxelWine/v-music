const Discord = require('discord.js');

const getColor = require('./getColor');

/**
 * Create a temporary message.
 * @param {string} content The message content.
 * @param {Discord.TextChannel} channel The channel to send the message.
 * @param {string} type The type of the message.
 */
module.exports = (content, channel, type) => {
  const embed = new Discord.EmbedBuilder()
    .setColor(getColor(type))
    .setDescription(content);

  channel.send({ embeds: [embed] }).then((message) => {
    setTimeout(() => message.delete(), 5000);
  }).catch(console.error);
};