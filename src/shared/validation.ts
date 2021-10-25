function validate(regex: RegExp, val: string) {
  return regex.test(val);
}

export const validateEmail = (email: string) => {
  return validate(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+.[a-z]+$/, email);
};

export const validateMobile = (phone: string) => {
  return String(Number(phone)).length === 10 && +phone[0] > 5;
};

export const validatePassword = (password: string) => {
  return validate(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/,
    password
  );
};

export const validatePhone = (phone: string) => {
  if (phone.includes("-")) {
    let str = phone.split("-");
    return str[0].length > 2 && str[0].length < 6 && str[1].length === 8;
  }
  return false;
};
