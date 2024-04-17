const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
const Voice = require('@discordjs/voice');
require('dotenv').config();
require('colors');

const database = require('./includes/database.js');

const client = new Discord.Client({
  intents:[
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.Message
  ]
});

client.on('ready', () => {
  console.clear();

  // Clear temp folder
  fs.rmSync('.temp', { recursive: true, force: true });
  fs.mkdirSync('.temp');

  console.log('V-Music Bot ready!'.green.bold);
});

client.on('messageCreate', message => {
  // Ignore messages from bots.
  if (message.author.bot) return;

  // Ignore messages invalid channels.
  if (![0, 5, 10, 11, 12].includes(message.channel.type)) return;

  // Detect if the message is a command.
  if (message.content.indexOf(process.env.PREFIX) !== 0) return;

  // Declare arguments and command.
  const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
  const command = (args.shift()).toLowerCase();

  try {
    const commandPath = path.join(__dirname, 'commands', `${command}.js`);
    if (!fs.existsSync(commandPath)) return console.warn(`Command not found: ${command}`.yellow);
    require(commandPath).run({ message, args });
  }
  catch (e) {
    console.error(`Error executing command: ${command}`.red.bold);
    console.error(e.stack.red);
  };
});

client.on('voiceStateUpdate', async(oldState, newState) => {
  const oldChannel = oldState.channel;
  const newChannel = newState.channel;

  if (oldChannel) {
    const isBotAlone = oldChannel.members.size == 1 && oldChannel.members.find(x => x.id == client.user.id);
    if (isBotAlone) {
      const connection = Voice.getVoiceConnection(oldChannel.guild.id);
      if (connection) {
        connection.disconnect();
        const songs = database.queue.get(oldChannel.guild.id);
        database.queue.clear(songs.map(x => x.id));
      };
    };

    if (newChannel && newState.member.user.id === client.user.id && newChannel.id !== oldChannel.id) {
      const songs = database.queue.get(oldChannel.guild.id);
      database.queue.clear(songs.map(x => x.id));
    };
  };
});

client.login(process.env.TOKEN);