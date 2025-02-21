const loginValidation = (formData) => {
  let errors = {};

  if (!formData.username) {
    errors.username = "Username is required";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  }

  return errors;
};

export default loginValidation;
