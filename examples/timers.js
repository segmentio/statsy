
var Client = require('..');
var http = require('http');
var stats = new Client;

require('./server');

setInterval(function(){
  var start = new Date;
  http.get('http://yahoo.com', function(err, res){
    stats.timer('request', new Date - start);
  });
}, 300);