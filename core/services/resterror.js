class RestError extends Error {
  constructor(status, name, message) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export default RestError;
