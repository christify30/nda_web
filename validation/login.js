const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.servicenumber = !isEmpty(data.servicenumber) ? data.servicenumber : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  
  if (Validator.isEmpty(data.servicenumber)) {
    errors.servicenumber = 'Service Number field is required';
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
