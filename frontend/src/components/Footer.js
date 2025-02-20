import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css"; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We provide cutting-edge solutions in financial investments with our AI-driven RoboAdvisor platform.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div className="footer-section">
          <h3>Our Services</h3>
          <ul>
            <li>AI Investment Strategies</li>
            <li>Risk Assessment</li>
            <li>Portfolio Management</li>
            <li>Market Insights</li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p><FaMapMarkerAlt /> 123 Investment St, FinTech City</p>
          <p><FaPhone /> +1 (234) 567-890</p>
          <p><FaEnvelope /> support@roboadvisor.com</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <a href="#" className="social-icon"><FaFacebook /></a>
        <a href="#" className="social-icon"><FaTwitter /></a>
        <a href="#" className="social-icon"><FaLinkedin /></a>
      </div>

      <p className="footer-bottom">&copy; {new Date().getFullYear()} RoboAdvisor. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
