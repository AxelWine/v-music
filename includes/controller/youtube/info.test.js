/* eslint-disable no-undef */
const getInfo = require('./info');

describe('getInfo', () => {
  it('should reject if no URL is provided', async() => {
    await expect(getInfo()).rejects.toThrow('URL is required');
  });

  it('should reject if the URL is invalid', async() => {
    await expect(getInfo('invalid_url')).rejects.toThrow('Invalid URL');
  });

  it('should resolve with video info if the URL is valid', async() => {
    const result = await getInfo('https://youtu.be/dQw4w9WgXcQ');
    expect(result.url).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });
});