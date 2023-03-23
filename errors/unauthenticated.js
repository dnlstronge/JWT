const CustomAPIError = require("./custom-error")

class UnauthenicatedError extends CustomAPIError {
    constructor(message) {
      super(message)
      this.statusCode = 401
      
    }
  }
  
  module.exports = UnauthenicatedError
  