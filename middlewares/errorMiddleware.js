const errorResponse = require("../utils/errorResponse");


const errorHandler = (err,req,res,next) => {
  let error = {...err};
  error.message = err.message;
  if(error.name === "castError"){
    const message = 'Resources not found';
    error = new errorResponse(message,404);
  }

  if(error.code === 11000){
    const message = 'Duplicate field value entered';
    error = new errorResponse(message,400);
  }

  if(error.name === "ValidationError"){
    const message = Object.values(err.errors).map(val => val.message)
    error = new errorResponse(message,400);
    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || "Server error"
    });
  }

}

module.exports = errorHandler;
