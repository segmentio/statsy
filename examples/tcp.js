
var Client = require('..');
var http = require('http');
var net = require('net');

var stats = new Client({ tcp: true });

net.createServer(function(sock){
  console.log('client connected %j', sock.address());
  sock.pipe(process.stdout);
  setTimeout(function(){
    console.log('close');
    sock.destroy();
  }, 2000);
}).listen(8125);

setInterval(function(){
  var start = new Date;
  http.get('http://yahoo.com', function(err, res){
    stats.timer('request', new Date - start);
  });
}, 300);