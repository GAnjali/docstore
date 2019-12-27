export default class ResponseUtil {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  getResponse(response) {
    if (response.status === 200 && response.data.status === "success") {
      if (response.data.data !== undefined) {
        this.setSuccess(response.data.message, response.data.data);
      } else {
        this.setSuccess(response.data.message, []);
      }
    } else if (response.status === 400 && response.data.status === "success") {
      this.setError(response.data.message);
    } else {
      this.setError(response.message);
    }
    return {
      status: this.type,
      message: this.message,
      data: this.data
    };
  }

  setSuccess(message, data) {
    this.message = message;
    this.data = data;
    this.type = "success";
  }

  setError(message) {
    this.message = message;

    this.type = "error";
  }
}