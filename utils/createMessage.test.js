/* eslint-disable no-undef */
const getColor = require('./getColor');
const createMessage = require('./createMessage');

describe('createMessage', () => {
  it('should reject if content is not provided', async() => {
    await expect(createMessage()).rejects.toThrow('Content is required');
  });

  it('should reject if content is not a string', async() => {
    await expect(createMessage(123)).rejects.toThrow('Content must be a string');
  });

  it('should create a message with the provided content', async() => {
    const content = 'Test content';
    const type = 'default';

    const result = createMessage(content, type);

    expect(result.data.title).toBe(content.substring(0, 256));
    expect(result.data.color).toBe(parseInt(getColor(type).replace('#', ''), 16));
  });

  it('should create a message substring if content is too long', async() => {
    const content = 'a'.repeat(300);
    const type = 'default';

    const result = createMessage(content, type);

    expect(result.data.title).toBe(content.substring(0, 256));
    expect(result.data.color).toBe(parseInt(getColor(type).replace('#', ''), 16));
  });
});