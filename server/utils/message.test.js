var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = "Tony";
    var lat = 33.7699741;
    var long = -118.1415146;
    var location = generateLocationMessage(from, lat, long);
    var url = `https://www.google.com/maps?q=${lat},${long}`;

    expect(location.from).toEqual(from);
    expect(location.url).toEqual(url);
    expect(location.createdAt).toBeA('number');
  });
});
