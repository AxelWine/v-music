/* eslint-disable no-undef */
const getSource = require('./getSource');

describe('getSource', () => {
  it('should reject with an error if no URL is provided', () => {
    return expect(getSource()).rejects.toThrow('URL is required');
  });

  it('should reject with an error if URL is not a string', () => {
    return expect(getSource(123)).rejects.toThrow('URL must be a string');
  });

  it('should resolve with an youtube type if the source is youtube', () => {
    const url = 'https://www.youtube.com/watch?v=XGxIE1hr0w4';
    return expect(getSource(url).type).toEqual('youtube');
  });

  it('should resolve with an other type if the source is an invalid youtube URL', () => {
    const url = 'https://www.youtube.com/watch?v=123';
    return expect(getSource(url).type).toEqual('other');
  });

  it('should reject with an other type if the source is not supported', () => {
    const url = 'https://www.google.com';
    return expect(getSource(url).type).toEqual('other');
  });
});