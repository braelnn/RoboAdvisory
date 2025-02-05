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
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [token, setToken] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login(formData); // Send login request
      setMessage("OTP sent to your email.");
      setOtpSent(true); // Show OTP input field
      setToken(response.token); // Temporarily store the token

      // Save token to localStorage only after OTP verification
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ otp }),
      });

      if (response.ok) {
        setMessage("OTP verified successfully!");
        localStorage.setItem("token", token); // Save the token after OTP verification
        window.location.href = "/home"; // Redirect to home page
      } else {
        const error = await response.json();
        setMessage(error.message || "Invalid OTP");
      }
    } catch (error) {
      setMessage(error.message || "An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SIGN IN</h2>
        {!otpSent ? (
          <form onSubmit={handleLogin}>
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
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit}>
            <div className="input-group">
              <label htmlFor="otp">Enter OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button">
              Verify OTP
            </button>
          </form>
        )}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Login;
