/* eslint-disable no-undef */
const download = require('./download');
const fs = require('fs');

jest.mock('ytdl-core');
jest.mock('fs');

describe('download function', () => {
  it('should resolve with a file path when the download is finished', async() => {
    const url = 'https://www.youtube.com/watch?v=XGxIE1hr0w4';
    const mockStream = {
      pipe: jest.fn(),
      on: jest.fn((event, callback) => callback())
    };

    require('ytdl-core').mockReturnValue(mockStream);
    fs.existsSync.mockReturnValue(true);

    const result = await download(url);

    expect(result).toContain('.mp3');
    expect(mockStream.pipe).toHaveBeenCalled();
    expect(fs.existsSync(result)).toBe(true);
  });

  it('should throw an error when the URL is invalid', async() => {
    await expect(download('invalid_url')).rejects.toThrow('Invalid URL');
  });

  it('should throw an error when the URL is not provided', async() => {
    await expect(download()).rejects.toThrow('URL is required');
  });
});