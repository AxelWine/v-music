/* eslint-disable no-undef */
const getColor = require('./getColor');

describe('getColor', () => {
  it('should return a valid color', () => {
    const result = getColor('default');
    expect(result).toMatch(/^#[0-9A-F]{6}$/);
  });

  it('should return the default color if the type is not found', () => {
    const result = getColor('invalid');
    expect(result).toMatch(/^#[0-9A-F]{6}$/);
  });
});