import React, { useState } from "react";
import authService from "../Services/authService"; // Import the service
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Call the register function in authService
      const response = await authService.register({
        fullname: formData.fullname,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
      alert(response.message); // Backend response message
    } catch (error) {
      alert(error.message || "Registration failed");
    }
  };

  return (
      
    <div className="register-container">
      <div className="info-box">
        <h2>Secure Your Financial Future with Smart Investing</h2>
        <p>
          Investing doesn’t have to be complicated. With <strong>RoboAdvisor</strong>, you get a powerful,
          AI-driven investment platform designed to help you grow and manage your wealth effortlessly.
          Whether you're a beginner or an experienced investor, our platform provides customized
          strategies tailored to your financial goals and risk tolerance.
        </p>
        
        <h3>Why Join RoboAdvisor?</h3>
        <ul>
          <li><strong>Smart Portfolio Management:</strong> Let our intelligent system optimize your investments for maximum returns.</li>
          <li><strong>Real-Time Market Insights:</strong> Stay ahead with live updates and data-driven investment opportunities.</li>
          <li><strong>Automated Risk Analysis:</strong> Reduce uncertainty with risk assessments that keep your portfolio balanced.</li>
          <li><strong>Easy-to-Use, Secure Platform:</strong> Your investments are protected with top-tier encryption and secure access.</li>
          <li><strong>Personalized Investment Strategies:</strong> Customize your portfolio based on your financial goals and preferences.</li>
          <li><strong>24/7 Accessibility:</strong> Manage your investments anytime, anywhere, from any device.</li>
        </ul>

        <p className="cta-text">
          Don’t miss out on smarter investing. <br/>
          <strong>Sign up today and take control of your financial future!</strong>
        </p>
      </div>


      <div className="register-box">
        <h2>Create An Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <div className="footer">
          <a href="/login" className="login-link">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
