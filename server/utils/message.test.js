var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'admin';
    var text = 'hello you';
    var res = generateMessage(from, text);
    expect(res).toInclude({from, text});
    expect(res.createdAt).toBeA('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'me';
    var latitude = 51.80;
    var longitude = 23.15;
    var url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    
    var message = generateLocationMessage(from, latitude, longitude);
    expect(message.from).toBe(from);
    expect(message.url).toBe(url);
    expect(message.createdAt).toBeA('number');
  });
});