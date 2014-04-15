
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;
var debug = require('debug')('statsy');
var fwd = require('forward-events');
var assert = require('assert');
var dgram = require('dgram');
var url = require('url');

/**
 * Expose `Client`.
 */

module.exports = Client;

/**
 * Initialize a new `Client` with `opts`.
 *
 * @param {Object} [opts]
 * @api public
 */

function Client(opts) {
  if (!(this instanceof Client)) return new Client(opts);
  opts = opts || {};
  this.sock = dgram.createSocket('udp4');
  this.host = opts.host || 'localhost';
  this.port = opts.port || 8125;
  this.prefix = opts.prefix;
  fwd(this.sock, this);
  this.on('error', this.onerror.bind(this));
}

/**
 * Inherit from `Emitter.prototype`.
 */

Client.prototype.__proto__ = Emitter.prototype;

/**
 * Noop errors.
 */

Client.prototype.onerror = function(err){
  debug('error %s', err.stack);
};

/**
 * Send `msg`.
 *
 * @param {String} msg
 * @api private
 */

Client.prototype.send = function(msg){
  var buf = new Buffer(msg);
  this.sock.send(buf, 0, buf.length, this.port, this.host);
};

/**
 * Send with prefix when specified.
 *
 * @param {String} msg
 * @api private
 */

Client.prototype.write = function(msg){
  if (this.prefix) msg = this.prefix + '.' + msg;
  this.send(msg);
};

/**
 * Send a gauge value.
 *
 * @param {String} name
 * @param {Number} val
 * @api public
 */

Client.prototype.gauge = function(name, val){
  debug('gauge %j %s', name, val);
  this.write(name + ':' + val + '|g');
};

/**
 * Send a meter value.
 *
 * @param {String} name
 * @param {Number} val
 * @api public
 */

Client.prototype.meter = function(name, val){
  debug('meter %j %s', name, val);
  this.write(name + ':' + val + '|m');
};

/**
 * Send a timer value or omit the value
 * to return a completion function.
 *
 * @param {String} name
 * @param {Number} [val]
 * @return {Function}
 * @api public
 */

Client.prototype.timer = function(name, val){
  var self = this;

  if (1 == arguments.length) {
    var start = new Date;
    return function(){
      self.timer(name, new Date - start);
    }
  }

  debug('timer %j %s', name, val);
  this.write(name + ':' + val + '|ms');
};

/**
 * Send a counter value with optional sample rate.
 *
 * @param {String} name
 * @param {Number} val
 * @param {Number} sample
 * @api public
 */

Client.prototype.count = function(name, val, sample){
  debug('count %j %s sample=%s', name, val, sample);
  if (sample) {
    this.write(name + ':' + val + '|c|@' + sample);
  } else {
    this.write(name + ':' + val + '|c');
  }
};

/**
 * Increment counter by `val` or 1.
 *
 * @param {String} name
 * @param {Number} val
 * @api public
 */

Client.prototype.incr = function(name, val){
  if (null == val) val = 1;
  this.count(name, val);
};

/**
 * Decrement counter by `val` or 1.
 *
 * @param {String} name
 * @param {Number} val
 * @api public
 */

Client.prototype.decr = function(name, val){
  if (null == val) val = 1;
  this.count(name, -val);
};
