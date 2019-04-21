const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateDutyInput(data) {
  let errors = {};

  data.dutytitle = !isEmpty(data.dutytitle) ? data.dutytitle : '';

  data.dutybase = !isEmpty(data.dutybase) ? data.dutybase : '';
  //data.dutylocation = !isEmpty(data.dutylocation) ? data.dutylocation : '';
  data.from = !isEmpty(data.from) ? data.from : '';


  if (Validator.isEmpty(data.dutytitle)) {
    errors.dutytitle = 'Duty Title field is required';
  }



  if (Validator.isEmpty(data.dutybase)) {
    errors.dutybase = 'Duty Base field is required';
  }

 /* if (Validator.isEmpty(data.dutylocation)) {
    errors.dutylocation = 'Duty Location is required';
  }*/
 
  if (Validator.isEmpty(data.from)) {
    errors.from = 'From field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
