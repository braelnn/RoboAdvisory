import React, { useState } from "react";
import "../styles/Faq.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    { question: "What is this platform about?", answer: "This platform provides tools and resources for managing your finances efficiently." },
    { question: "How do I create an account?", answer: "Click on the Sign-Up button on the homepage and fill out the registration form." },
    { question: "What features are included?", answer: "You can track investments, set goals, and access real-time market data." },
    { question: "Is my data secure?", answer: "Yes, we use encryption and other security measures to protect your data." },
    { question: "Is there a fee to use this platform?", answer: "Basic features are free, but premium features require a subscription." },
    { question: "How can I contact support?", answer: "You can contact support through the 'Contact Us' page or via email." },
    { question: "Can I share my account with others?", answer: "No, sharing accounts is against our terms of service." },
    { question: "How often is data updated?", answer: "Market data is updated in real-time, and user data syncs immediately." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq">
      < Header />
        <div className="faq-container">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <div
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                >
                  {item.question}
                  <span className="faq-toggle">
                    {activeIndex === index ? "-" : "+"}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">{item.answer}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      <Footer />
    </div>
  );
};

export default FAQ;
