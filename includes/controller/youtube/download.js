const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');
const youtubeUrl = require('youtube-url');

module.exports = url => {
  return new Promise((resolve, reject) => {
    const tempDir = path.join(process.cwd(), '.temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    if (!url) return reject(new Error('URL is required'));
    if (!youtubeUrl.valid(url)) return reject(new Error('Invalid URL'));

    const id = ytdl.getVideoID(url);
    const stream = ytdl(`https://youtube.com/watch?v=${id}`, { filter: 'audioonly' });
    const filePath = path.join(process.cwd(), '.temp', `${uuid()}.mp3`);

    stream.pipe(fs.createWriteStream(filePath));
    stream.on('finish', () => resolve(filePath));
  });
};