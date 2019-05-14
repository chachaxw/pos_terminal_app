// Email validation
export function emailValidation(value) {
  const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  if (typeof value === 'string') {
    return reg.test(value.trim());
  }

  throw new Error('The email validation can only check string type value, please check your parameter is right or not!');
}