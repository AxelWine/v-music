const fs = require('fs');
const Discord = require('discord.js');
const path = require('path');
require('dotenv').config();
require('colors');

const client = new Discord.Client({
  intents:[
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.GuildVoiceStates
  ],
  partials: [
    Discord.Partials.Channel,
    Discord.Partials.Message
  ]
});

client.on('ready', async function() {
  console.clear();

  // Clear temp folder.
  fs.rmSync('./temp', { recursive: true, force: true });
  fs.mkdirSync('./temp');

  console.log('V-Music Bot ready!'.green.bold);
});

client.on('messageCreate', async (message) => {
  // Ignore messages from bots.
  if( message.author.bot ) return;

  // Ignore messages invalid channels.
  if (![0, 5, 10, 11, 12].includes(message.channel.type)) return;

  // Detect if the message is a command.
  if (message.content.indexOf(process.env.PREFIX) === -1) return;

  // Declare arguments and command.
  const args = message.content.slice(process.env.PREFIX).split(/ +/);
  const command = (args.shift()).toLowerCase();

  try {
    const commandPath = path.join(__dirname, 'commands', `${command}.js`);

    if (!fs.existsSync(commandPath)) return console.error(`Command not found: ${command}`.yellow);

    const commandFile = require(commandPath);
    return commandFile.run({ message, args });
  }
  catch(e) {
    console.error(`Error executing command: ${command}`.red.bold);
    console.error(e);
  };
});

client.login(process.env.TOKEN);