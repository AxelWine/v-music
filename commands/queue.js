const database = require('../includes/database.js');
const controller = require('../includes/controller/index.js');
const isInVoiceChannel = require('../utils/isInVoiceChannel.js');
const sendTempEmbed = require('../utils/sendTempEmbed.js');
const createMessage = require('../utils/createMessage.js');
const t = require('../utils/t.js');
const getLang = require('../utils/getLang.js');

exports.run = async({ message, args }) => {
  const lang = getLang(message.guild.id);
  let queue = database.queue.get(message.guild.id);

  if (!isInVoiceChannel(message.member)) {
    const embed = createMessage(t('commands.errors.noInVoiceChannel', lang), 'error');
    sendTempEmbed(embed, message.channel);
    return;
  };

  console.log(queue);
};