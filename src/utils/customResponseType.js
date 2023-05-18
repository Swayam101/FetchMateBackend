class Response {
  constructor(error, data, message) {
    (this.error = error), (this.data = data), (this.message = message);
  }
}

module.exports = Response;
