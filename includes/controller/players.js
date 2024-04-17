const Voice = require('@discordjs/voice');
const { EventEmitter } = require('events');

const queue = require('../queue.js');
const youtube = require('../controller/youtube');

class Players extends EventEmitter {
  constructor() {
    super();
  };

  play = async(channel, songId) => {
    if (!channel) return Promise.reject(new Error('Channel is required'));
    if (!songId) return Promise.reject(new Error('Song ID is required'));

    const song = queue.getSong(songId);
    if (!song) return Promise.reject(new Error('Song not found'));

    const filePath = await youtube.download(song.url);

    const oldConnection = Voice.getVoiceConnection(channel.guild.id);
    const resource = Voice.createAudioResource(filePath, { inlineVolume:true });
    resource.volume.setVolume(0.5);

    const player = Voice.createAudioPlayer();
    player.play(resource);
    player.on('idle', () => {
      this.onFinishSong(channel, song);
    }).on('error', () => {
      this.emit('onErrorQueue');
    });

    if (!oldConnection) {
      const connection = Voice.joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
      });

      connection.on('ready', () => {
        connection.subscribe(player);
      });
    } else {
      oldConnection.subscribe(player);
    };
  };

  onFinishSong(channel, song) {
    const serverId = song.server;
    queue.removeSong(song.id);
    const nextSong = queue.get(serverId)[0];
    if (nextSong) {
      setTimeout(() => {
        this.emit('onNextSong', channel, song, nextSong);
        this.play(channel, nextSong.id);
      }, 1000);
    } else {
      this.emit('onFinishQueue', channel, song);
    };
  };
};

module.exports = new Players();