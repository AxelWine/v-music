const { Voice } = require('@discordjs/voice');
const { EventEmitter } = require('events');

const queue = require('../queue.js');

class Players extends EventEmitter {
  constructor() {
    super();
  };

  play(channel, songId) {
    console.log('play');
    if (!channel) return Promise.reject(new Error('Channel is required'));
    if (!songId) return Promise.reject(new Error('Song ID is required'));

    const song = queue.get(songId);
    if (!song) return Promise.reject(new Error('Song not found'));

    const connection = Voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    connection.on('ready', () => {
      const resource = Voice.createAudioResource(song.filePath);
      resource.volume.setVolume(0.5);
      connection.subscribe(resource);

      const player = Voice.createAudioPlayer();
      player.play(resource);
      player.on('idle', () => {
        this.emit('onFinishSong', song);
      }).on('error', () => {
        this.emit('onErrorQueue');
      });

      queue[channel.id].player = player;
      queue[channel.id].connection.subscribe(player);
      queue[channel.id].timeoutId = Math.round(Math.random() * 10000);

    });
  };
};

module.exports = Players;