module.exports = member => {
  if (!member || !member.voice.channel) return false;

  const botVoiceChannel = member.guild.members.me.voice.channel;
  return !botVoiceChannel || member.voice.channel.id === botVoiceChannel.id;
};