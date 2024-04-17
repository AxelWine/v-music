const youtubeUrl = require('youtube-url');
const ytdl = require('ytdl-core');

module.exports = async url => {
  return new Promise(async(resolve, reject) => {
    if (!url) return reject(new Error('URL is required'));
    if (!youtubeUrl.valid(url)) return reject(new Error('Invalid URL'));

    ytdl.getInfo(url).then(info => {
      resolve({
        title: info.videoDetails.title,
        url: info.videoDetails.video_url,
        duration: info.videoDetails.lengthSeconds,
        thumbnail: info.videoDetails.thumbnails[0].url
      });
    }).catch(error => {
      reject(error);
    });
  });
};