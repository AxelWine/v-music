module.exports = class Song {
  constructor(props) {
    this.id = props.id;
    this.server = props.server;

    this.addedBy = props.addedBy;
    this.addedAt = props.addedAt || Date.now();

    this.title = props.title || 'Unknown';
    this.artist = props.artist || 'Unknown';
    this.cover = props.cover || null;
    this.url = props.url || null;
    this.source = props.source || null;
    this.duration = props.duration || null;
    this.filePath = props.filePath || null;
  }
};