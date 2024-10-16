import { ValidationRule } from 'react-hook-form';

export const PhonePattern: ValidationRule<RegExp> = {
  value: /^(0|\+44)+\d{10}$/,
  message: 'Starts with 0 or +44 and following 9 digits',
};

export const EmailPattern: ValidationRule<RegExp> = {
  value:
    /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/,

  message: 'Valid email',
};
