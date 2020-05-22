const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit
    this.currentBytes = 0
  }

  _transform(chunk, encoding, callback) {
    this.currentBytes += Buffer.byteLength(chunk)
    if (this.currentBytes > this.limit) {
      return callback(new LimitExceededError())
    }
    this.push(chunk)
    return callback()
  }
}

module.exports = LimitSizeStream;
