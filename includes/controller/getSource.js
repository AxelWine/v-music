const youtubeUrl = require('youtube-url');

module.exports = url => {
  if (!url) return Promise.reject(new Error('URL is required'));
  if (typeof url !== 'string') return Promise.reject(new Error('URL must be a string'));

  if (youtubeUrl.valid(url)) return { type: 'youtube', url };
  else return { type: 'other', url };
}