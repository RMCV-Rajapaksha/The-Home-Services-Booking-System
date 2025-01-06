import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import signupValidator from "../validators/signupValidator";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = signupValidator(formData);
    if (Object.keys(errors).length) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);
        const requestBody = {
          username: formData.username,
          password: formData.password,
        };
        console.log("Form Data:", formData); // Log the form data
        console.log("Request Body:", requestBody); // Log the requestBody data
        const response = await axios.post("/register", requestBody);
        const data = response.data;
        console.log("Response Data:", data); // Log the response data

        toast.success(data.message || "User registered successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
        setFormData({
          username: "",
          password: "",
          confirmPassword: "",
        });
        setFormError({});
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        toast.error(error.response?.data?.message || "Something went wrong", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: true,
        });
      }
    }
  };

  return (
    <div className="form-container">
      <form className="inner-container" onSubmit={handleSubmit}>
        <h2 className="form-title">Signup Form</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            name="username"
            placeholder="JohnDoe"
            value={formData.username}
            onChange={handleChange}
          />
          {formError.username && <p className="error">{formError.username}</p>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
          />
          {formError.password && <p className="error">{formError.password}</p>}
        </div>

        <div className="form-group">
          <label>Confirm Password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            placeholder="********"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formError.confirmPassword && <p className="error">{formError.confirmPassword}</p>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Signing up..." : "Signup"}
        </button>
      </form>
    </div>
  );
};

export default Signup;