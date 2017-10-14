const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {

  it('should reject non-string values', () => {
    expect(isRealString(2)).toBe(false); // number
    expect(isRealString({foo: 'bar'})).toBe(false); // object
  });

  it('should reject string with only spaces', () => {
    expect(isRealString('   ')).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    expect(isRealString(' Tony  ')).toBe(true);
  });

});
