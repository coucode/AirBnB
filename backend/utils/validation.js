const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middelware
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);
// CHECK AUTHME FOR ORIGINAL CODE IF THERE ARE ERRORS
  if (!validationErrors.isEmpty()){
    const err = Error('Validation error');
    errorsObj = {}  
    const errors = validationErrors 
      .array()
      .map((error) => {
        let key = error.param
        let msg = error.msg
        if (!errorsObj[key]){
          errorsObj[key] = msg
        }
      });
    err.message = "Validation error"
    err.errors = errorsObj;
    err.status = 400;
    err.title = 'Validation Error';
    next(err);
  }
  next();
}


module.exports = {
  handleValidationErrors
};