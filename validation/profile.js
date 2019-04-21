const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : '';
 // data.avatar = !isEmpty(data.avatar) ? data.avatar : '';
 // 
  data.mobilenumber = !isEmpty(data.mobilenumber) ? data.mobilenumber : '';
  data.rank = !isEmpty(data.rank) ? data.rank : '';



  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email please enter a valid email';
  }

  if (Validator.isEmpty(data.mobilenumber)) {
    errors.mobilenumber = 'Mobile Number field is required';
  }

 
  if (Validator.isEmpty(data.rank)) {
    errors.rank = 'Rank field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
