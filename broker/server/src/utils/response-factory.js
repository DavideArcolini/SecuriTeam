'use strict';

module.exports = {
    fabricateResponse: function(statusCode, objectBody) {
      return {
        statusCode: statusCode,
        objectBody: objectBody
      };
    },
    
    fabricateError: function(errorCode, message) {
      return {
        statusCode: errorCode,
        objectBody: message
      };
    }
  };
  