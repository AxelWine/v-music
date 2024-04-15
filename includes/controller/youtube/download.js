const ytdl = require('ytdl-core');
const fs = require('fs');
const path = require('path');
const { v4: uuid } = require('uuid');

module.exports = url => {
  return new Promise((resolve) => {
    const tempDir = path.join(process.cwd(), '.temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    if (!ytdl.validateURL(url)) {
      throw new Error('Invalid URL');
    };

    const stream = ytdl(url, { filter: 'audioonly' });
    const filePath = path.join(process.cwd(), '.temp', `${uuid()}.mp3`);

    stream.pipe(fs.createWriteStream(filePath));
    stream.on('finish', () => resolve(filePath));
  });
};