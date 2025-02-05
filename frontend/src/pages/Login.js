import React, { useState } from "react";
import { login } from "../Services/authService"; // Import the login function
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData); // Call the login function
      setMessage(response.message);
      setToken(response.token);

      // Save token to localStorage
      localStorage.setItem("token", response.token);

      // Optionally redirect user
      window.location.href = "/home";
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
      <div className="login-container">
        <div className="login-box">
          <h2>SIGN IN</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            <a href="/" className="login-link">
            Register Here
            </a>
          </form>
          {message && <p className="message">{message}</p>}
        </div>
      </div>
  );
};

export default Login;
