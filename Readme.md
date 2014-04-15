
# statsd-client

  A simple statsd client.

## Installation

```
$ npm install segmentio/statsd-client
```

## Example

```js

var Client = require('statsd-client');
var http = require('http');
var stats = new Client;

setInterval(function(){
  var end = stats.timer('request');
  http.get('http://yahoo.com', function(err, res){
    // do stuff
    end();
  });
}, 1000);

```

## API

### Client([opts])

 Initialize a client with the given options:

 - `host` [localhost]
 - `port` [8125]
 - `prefix` optional prefix ('.' is appended)

### .gauge(name, val)

  Send gauge value.

### .meter(name, val)

  Send meter value.

### .count(name, val)

  Send count value.

### .incr(name, [val])

  Increment by `val` or 1.

### .decr(name, [val])

  Decrement by `val` or 1.

### .histogram(name, val)

 Send histogram value.

### .histogram(name)

 Return histogram delta function.

### .timer(name, val)

 Send timer value.

### .timer(name)

 Return timer delta function.

# License

  MIT