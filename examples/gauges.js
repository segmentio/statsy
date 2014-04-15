
var Client = require('..');
require('./server');

var stats = new Client({ prefix: 'myapp' });

setInterval(function(){
  var mem = process.memoryUsage();
  stats.gauge('heap:used', mem.heapUsed);
}, 1000);