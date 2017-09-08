var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate thee correct message object', () => {
    var from = 'Tony';
    var text = 'Sah dude';
    var message = generateMessage(from, text);
    expect(message.from).toEqual(from);
    expect(message.text).toEqual(text);
    expect(message.createdAt).toBeA('number');
  });
});
