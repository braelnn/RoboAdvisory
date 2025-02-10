import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './Home.css'

function Home() {
  

  
  return (
    <div className="home">
       <Header />
       <section className="hero section dark-background">
        

        <div className="container">
          <h2 className="hero-title">
          Invest Smartly, Secure Your Future
          </h2>
          <p className="hero-text">
          RoboAdvisor offers automated, data-driven investment solutions tailored to your goals
          </p>
          <div className="hero-cta">
            <Link to="/login" className="btn-get-started">
              Get Started
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="about section">
      <div className="container">
        <div className="row">
          <div className="image-column">
          <div className="about-image"></div>
          </div>

          <div className="content-column">
            <h3>Smarter Investments with Cutting-Edge Technology</h3>
            <p className="italic-text">
            RoboAdvisor empowers you with advanced tools to take control of your financial future. Explore features designed to optimize your investments and simplify decision-making.
            </p>
            <ul className="feature-list">
              <li>
                <span className="check-icon">✓</span>
                <span>Automated Portfolio Management: Effortlessly allocate assets based on your financial goals and risk tolerance.</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Real-Time Market Insights: Access up-to-date market trends and data for informed decisions.</span>
              </li>
              <li>
                <span className="check-icon">✓</span>
                <span>Personalized Reports: Get detailed performance insights and recommendations tailored to your investments.</span>
              </li>
            </ul>
            <Link to="/marketdata" className="read-more">
              <span>Discover More</span>
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>    
    <section id="why-us" className="why-us section">
        <div className="container">
          <div className="red-card">
            <h3>Why Choose RoboAdvisor for Your Portfolio?</h3>
            <p>
              Our portfolio management tools provide you with automated, efficient, 
              and personalized investment strategies. Whether you're starting your financial journey 
              or managing an established portfolio, RoboAdvisor simplifies the process and maximizes your returns.
            </p>
            <Link to="/portfolio" className="cta-btn">Learn More</Link>
          </div>
        </div>
      </section>

      {/* ✅ Success Stories Section - Red Cards */}
      <section id="success-stories" className="success-stories section">
        <div className="container">
          <h3 className="section-title">Success Stories: Real People, Real Growth</h3>
          <p className="section-subtext">
            Join thousands of users who have transformed their financial future with RoboAdvisor.
          </p>
          <div className="card-grid">
            <div className="red-card">
              <p>“I used to struggle with investment decisions, but RoboAdvisor made everything so simple!  
              My portfolio has grown by 30% in just one year!”</p>
              <span>- Sarah L., Tech Entrepreneur</span>
            </div>
            <div className="red-card">
              <p>“The AI-powered insights helped me make smarter financial choices. I now have a  
              diversified portfolio and peace of mind.”</p>
              <span>- Ogolla K.,  Financial Analyst</span>
            </div>
            <div className="red-card">
              <p>“RoboAdvisor takes the guesswork out of investing. My savings are now working for me,  
              and I couldn’t be happier!”</p>
              <span>- James C., Small Business Owner</span>
            </div>
          </div>
        </div>
      </section>

      {/* ✅ How It Works Section - Red Cards
      <section id="how-it-works" className="how-it-works section">
        <div className="container">
          <h3 className="section-title">How It Works</h3>
          <p className="section-subtext">Getting started is easy. Follow these simple steps:</p>
          <div className="card-grid">
            <div className="red-card">
              <h4>Step 1: Sign Up</h4>
              <p>Create an account in minutes and set up your financial goals.</p>
            </div>
            <div className="red-card">
              <h4>Step 2: Personalized Plan</h4>
              <p>Answer a few questions, and let our AI tailor an investment strategy for you.</p>
            </div>
            <div className="red-card">
              <h4>Step 3: Start Investing</h4>
              <p>Deposit funds, and RoboAdvisor will handle the rest—monitoring, rebalancing, and optimizing.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* ✅ Join Us Section - Red CTA Card */}
      <section id="join-us" className="join-us section">
        <div className="container">
          <div className="red-card cta-card">
            <h3>Start Your Journey Today</h3>
            <p>Join thousands of smart investors who trust RoboAdvisor to grow their wealth.</p>
            <Link to="/" className="cta-btn">Join Now</Link>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Home;