const Voice = require('@discordjs/voice');
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

    const song = queue.getSong(songId);
    if (!song) return Promise.reject(new Error('Song not found'));

    const connection = Voice.joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    connection.on('ready', () => {
      const resource = Voice.createAudioResource(song.filePath, { inlineVolume:true });
      resource.volume.setVolume(0.5);

      const player = Voice.createAudioPlayer();
      player.play(resource);
      player.on('idle', () => {
        this.onFinishSong(channel, song);
      }).on('error', () => {
        this.emit('onErrorQueue');
      });

      connection.subscribe(player);
    });
  };

  onFinishSong(channel, song) {
    const serverId = song.server;
    console.log('onFinishSong');
    queue.removeSong(song.id);
    const nextSong = queue.get(serverId)[0];
    if (nextSong) {
      setTimeout(() => {
        console.log('nextSong');
        this.emit('onNextSong', channel, song, nextSong);
        this.play(channel, nextSong.id);
      }, 1000);
    } else {
      console.log('onFinishQueue');
      this.emit('onFinishQueue', channel, song);
    };
  };
};

module.exports = new Players();