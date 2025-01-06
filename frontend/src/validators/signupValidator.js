const signupValidator = ({ username, password, confirmPassword }) => {
  const errors = {
    username: "",
    password: "",
    confirmPassword: "",
  };

  if (!username) {
    errors.username = "Username is required";
  }

  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default signupValidator;