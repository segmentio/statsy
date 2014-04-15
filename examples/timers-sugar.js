
var Client = require('..');
var http = require('http');
var stats = new Client;

require('./server');

setInterval(function(){
  var end = stats.timer('request');
  http.get('http://yahoo.com', function(err, res){
    end();
  });
}, 1000);

