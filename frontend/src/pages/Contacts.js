import React, { useState } from 'react';
import '../styles/Contacts.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { sendContactMessage } from '../Services/contactsService';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    subject: '',
    message: '',
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get user's JWT token

    if (!token) {
      setSuccessMessage("You must be logged in to send a message.");
      return;
    }

    try {
      const response = await sendContactMessage(formData, token);
      if (response.status === 200) {
        setSuccessMessage("Your message has been sent to the admin.");
        setFormData({ subject: "", message: "" }); // Reset form
      } else {
        setSuccessMessage("Error: Could not send your message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setSuccessMessage("Error: Could not send your message. Please try again later.");
    }

    setTimeout(() => setSuccessMessage(""), 5000); // Clear message after 5 seconds
  };


  return (
    <div className='contactss'>
      <Header />
      <div className="contacts">
        <div className="hero-section">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Get in touch with us today.</p>
        </div>

        <div className="contact-container">
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {/* <input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              /> */}
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              >
                <option value="">Select Subject</option>
                <option value="general">General Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="sales">Sales Inquiry</option>
              </select>
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

          <div className="contact-details">
            <h2>Contact Information</h2>
            <p><strong>Address:</strong> 567 HomeTech, Nairobi, Kenya</p>
            <p><strong>Phone:</strong> +254 (0) 799714455</p>
            <p><strong>Email:</strong> blessingbraelly@gmail.com</p>
            <p><strong>Working Hours:</strong> Mon - Fri, 9 AM - 5 PM</p>
          </div>
        </div>

        <div className="map-container">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.06949664727!2d36.816216949999996!3d-1.28638995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173de499d041%3A0x6f22944e5c5bcf38!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1614234567890!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contacts;
