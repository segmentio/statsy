
var Client = require('..');
require('./server');

var stats = new Client;

setInterval(function(){
  stats.count('something', 1);
}, 150);

setInterval(function(){
  stats.count('something', 50);
}, 500);