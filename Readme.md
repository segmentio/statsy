
# statsy

  A simple statsd client.

## Installation

```
$ npm install statsy
```

## Example

```js

var Client = require('statsy');
var http = require('http');
var stats = new Client;

setInterval(function(){
  stats.incr('requests');
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
 - `tcp` use TCP instead of UDP

Events from the socket are forwarded, however by default
 errors are simply ignored. When TCP is used reconnection
 attempts will be made until the connection is re-established.

### .gauge(name, val)

  Send gauge value.

### .meter(name, val)

  Send meter value.

### .set(name, val)

  Send set value.

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