const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.line = '';
  }

  _transform(chunk, encoding, callback) {
    const string = chunk.toString()
    const lines = string.split(os.EOL)

    if (lines.length > 1) {
      for (let i = 0; i < lines.length - 1; i++) {
        this.line += lines[i];
        this.push(this.line);
      }
      this.line = lines[lines.length - 1];
    } else {
      this.line += string;
    }

    callback();
  }

  _flush(callback) {
    callback(null, this.line);
  }
}

module.exports = LineSplitStream;
