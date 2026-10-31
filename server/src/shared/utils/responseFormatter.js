/**
 * for formatting API responses
 */

class ResponseFormatter {
  /**
   * Formates a successful response with optional data and message
   * @param {any} data - The data to include in the response (default : null)
   * @param {string} message - The message to include in the response (default :"Success")
   * @param {number} statusCode - The HTTP status code for the response(default 200)
   * @returns {Object}- The formatted response object
   */

  static success(data = null, message = "Success", statusCode = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * formats an error message with a message , status code , and optional error details
   * @param {string} message -  The error message to include in the response (default: "Error")
   * @param {number} statusCode  - The HTTP status code for the response(default 500)
   * @param {any} error - Additional error details to include in the response (default: null)
   * @returns {Object} - The formatted error response object
   */

  static error(message = "Error", statusCode = 500, error = null) {
    return {
      success: false,
      message,
      statusCode,
      error,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * formats a validation error reponse with optional error details
   * @param {any} error - Additional error details to be included in the response (default - null)
   * @returns {Object} - formatted validation error response object
   */

  static validationError(error = null) {
    return {
      success: false,
      message: "Validation failed",
      error,
      statusCode: 400,
      timestamp: new Date.toISOString(),
    };
  }

  /**
   * formats a paginated response with data and pagination details
   * @param {any} data
   * @param {number} page
   * @param {number} time
   * @param {number} total
   * @returns {Object} -  The formatted paginated reponse object
   */

  static paginated(data = null, page, time, total) {
    return {
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      timestamp: new Date.toISOString(),
    };
  }
}

export default ResponseFormatter;
