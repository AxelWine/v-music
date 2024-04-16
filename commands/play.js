const database = require('../includes/database.js');
const controller = require('../includes/controller');
const isInVoiceChannel = require('../utils/isInVoiceChannel.js');
const sendTempEmbed = require('../utils/sendTempEmbed.js');
const createMessage = require('../utils/createMessage.js');
const t = require('../utils/t.js');
const getLang = require('../utils/getLang.js');

exports.run = async({ message, args }) => {
  const request = args.join(' ');
  const lang = getLang(message.guild.id);
  let queue = database.queue.get(message.guild.id);

  if (!isInVoiceChannel(message.member)) {
    const embed = createMessage(t('commands.errors.notInVoiceChannel', lang), 'error');
    sendTempEmbed(embed, message.channel);
    return;
  };

  if (!request) {
    const embed = createMessage(t('commands.play.noRequest', lang), 'error');
    sendTempEmbed(embed, message.channel);
    return;
  };

  const source = controller.getSource(request).type;
  let songInfo;
  if (source === 'youtube' || source === 'other') {
    try {
      const url = source === 'youtube' ? request : (await controller.youtube.search(request)).url;
      if (!url) {
        const embed = createMessage(t('commands.play.notFound', lang), 'error');
        sendTempEmbed(embed, message.channel);
        return;
      };

      const filePath = await controller.youtube.download(url);
      const info = await controller.youtube.info(url);
      songInfo = {
        guild: message.guild.id,
        title: info.title,
        url: info.url,
        duration: info.duration,
        thumbnail: info.thumbnail,
        filePath
      };
    } catch (error) {
      console.error(error);
    };
  };

  if (!songInfo) {
    const embed = createMessage(t('commands.play.unknownError', lang), 'error');
    sendTempEmbed(embed, message.channel);
  };

  database.queue.addSong(songInfo, message.guild.id);
  queue = database.queue.get(message.guild.id);
  const autoPlay = queue.length === 1;
  const titleArgs = { song: songInfo.title };
  const title = autoPlay
    ? t('commands.play.nowPlaying', lang, titleArgs)
    : t('commands.play.addedToQueue', lang, titleArgs);
  const embed = createMessage(title, 'success');
  embed.setThumbnail(songInfo.thumbnail);
  message.channel.send({ embeds: [embed] });

  if (autoPlay) controller.players.play(message.member.voice.channel, songInfo.id);
};