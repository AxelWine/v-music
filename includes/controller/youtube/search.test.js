/* eslint-disable no-undef */
const search = require('./search');

describe('search function', () => {
  it('should resolve with the first result', async () => {
    const query = 'rick astley never gonna give you up';
    const result = await search(query);

    expect(result.url).toBe('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(result.id).toBe('dQw4w9WgXcQ');
  });

  it('should resolve with the first result when the query is empty', async () => {
    await expect(search()).rejects.toThrow('Query is required');
  });
});