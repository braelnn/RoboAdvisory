import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/Home.css'
import Footer from '../components/Footer';
import { FaRobot, FaChartLine, FaMoneyCheckAlt, FaShieldAlt, FaUserTie,
          FaLightbulb, FaRocket, FaGlobe, FaBook, FaUserCheck, FaUsers } from 'react-icons/fa';

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
        <h2>Why Choose <span className="highlight">RoboAdvisor</span> for Your Portfolio?</h2>
        <p className="section-description">
          RoboAdvisor offers cutting-edge automated investment solutions, 
          ensuring data-driven, secure, and intelligent portfolio management tailored to your goals.
        </p>
        
        {/* Features Grid */}
        <div className="features-grid">
          
          {/* AI-Powered Investing */}
          <div className="feature-card">
            <FaRobot className="feature-icon" />
            <h3>AI-Powered Investing</h3>
            <p>Leverage advanced AI algorithms to optimize asset allocation and enhance returns.</p>
          </div>

          {/* Real-Time Market Insights */}
          <div className="feature-card">
            <FaChartLine className="feature-icon" />
            <h3>Real-Time Market Insights</h3>
            <p>Stay ahead with live market data and predictive analytics.</p>
          </div>

          {/* Smart Portfolio Management */}
          <div className="feature-card">
            <FaMoneyCheckAlt className="feature-icon" />
            <h3>Smart Portfolio Management</h3>
            <p>Automated, personalized strategies based on your financial goals and risk tolerance.</p>
          </div>

          {/* Secure & Transparent */}
          <div className="feature-card">
            <FaShieldAlt className="feature-icon" />
            <h3>Secure & Transparent</h3>
            <p>Robust encryption and real-time tracking for a safe investment experience.</p>
          </div>

          {/* Expert Support */}
          <div className="feature-card">
            <FaUserTie className="feature-icon" />
            <h3>Expert Financial Guidance</h3>
            <p>Access professional investment advice and support when needed.</p>
          </div>
          
        </div>

        {/* CTA Button */}
        <div className="cta-container">
          <Link to="/portfolio" className="cta-btn">Learn More</Link>
        </div>
      </div>
    </section>  

    {/* Learn & Grow Section */}
      <section id="learn-grow" className="learn-grow section">
        <div className="container">
          <h2><FaBook className="section-icon" /> Learn & Grow</h2>
          <p>Gain expert knowledge with our investment resources.</p>
          <div className="resources-grid">
            <div className="resource-card"><FaUserCheck className="resource-icon" /><h4>Investment Basics</h4><p>Learn the fundamentals of smart investing.</p></div>
            <div className="resource-card"><FaChartLine className="resource-icon" /><h4>Advanced Strategies</h4><p>Optimize your portfolio with proven methods.</p></div>
            <div className="resource-card"><FaRocket className="resource-icon" /><h4>Future Trends</h4><p>Stay ahead with expert predictions.</p></div>
          </div>
        </div>
      </section>  
  

    <section id="success-stories" className="success-stories section">
      <div className="container">
        <h3 className="section-title">📈 Success Stories: Real People, Real Growth</h3>
        <p className="section-subtext">
          See how our AI-powered RoboAdvisor has transformed the financial lives of thousands.
        </p>

        <div className="story-grid">
          <div className="story-card">
            <FaChartLine className="icon" />
            <h4>Strategic Growth</h4>
            <p>
              “I used to struggle with investment decisions, but RoboAdvisor made everything simple! 
              My portfolio has grown by <strong>30% in just one year</strong>!”
            </p>
            <span>- Sarah L., Tech Entrepreneur</span>
          </div>

          <div className="story-card">
            <FaLightbulb className="icon" />
            <h4>Smart Insights</h4>
            <p>
              “The AI-powered insights helped me make <strong>smarter financial choices</strong>. 
              I now have a diversified portfolio and peace of mind.”
            </p>
            <span>- Ogolla K., Financial Analyst</span>
          </div>

          <div className="story-card">
            <FaRocket className="icon" />
            <h4>Financial Freedom</h4>
            <p>
              “RoboAdvisor takes the guesswork out of investing. My savings are now <strong>working for me</strong>, 
              and I couldn’t be happier!”
            </p>
            <span>- James C., Small Business Owner</span>
          </div>
        </div>
      </div>
    </section>

      

      
       {/* New Sections */}
      {/* Global Reach Section */}
      <section id="global-reach" className="global-reach section">
        <div className="container">
          <h2><FaGlobe className="section-icon" /> Expanding Globally</h2>
          <p>RoboAdvisor serves investors worldwide, ensuring cross-border investment opportunities.</p>
          <ul>
            <li>Available in 20+ countries</li>
            <li>Multi-currency investment options</li>
            <li>Localized financial strategies</li>
          </ul>
        </div>
      </section>
  


    <section id="join-us3" className="join-us section">
      <div className="container">
        <div className="red-card cta-card3">
          <FaUsers className="cta-icon3" /> {/* Add Icon Here */}
          <h3>Start Your Journey Today</h3>
          <p>Join thousands of smart investors who trust RoboAdvisor to grow their wealth.</p>
          <Link to="/" className="cta-btn3">Join Now</Link>
        </div>
      </div>
    </section>

      <Footer />
    </div>
  );
}


export default Home;