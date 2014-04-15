
var dgram = require('dgram');
var sock = dgram.createSocket('udp4');

sock.bind(8125);

sock.on('message', function(msg){
  console.log('statsd: %j', msg.toString());
});