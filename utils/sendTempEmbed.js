/**
  * Send a temporary embed message to a channel
  * @param {Discord.EmbedBuilder} embed The embed to send
  * @param {Discord.TextChannel} channel The channel to send the message
  * @returns {Promise<void>}
  */
module.exports = (embed, channel) => {
  channel.send({ embeds: [embed] }).then(message => {
    setTimeout(() => message.delete(), 5000);
  }).catch(console.error);
};