import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import './Home.css'

function Home() {
  const [counts, setCounts] = useState({
    users: 0,
    portfolios: 0,
    market: 0,
    admins: 0
  });

  const finalCounts = {
    users: 1232,
    portfolios: 64,
    market: 42,
    admins: 24
  };

  useEffect(() => {
    const duration = 1000; // 1 second duration
    const steps = 20; // Number of steps in the animation
    const interval = duration / steps;

    const counters = Object.entries(finalCounts).map(([key, value]) => {
      const stepValue = value / steps;
      let currentStep = 0;

      return setInterval(() => {
        if (currentStep < steps) {
          setCounts(prev => ({
            ...prev,
            [key]: Math.round(stepValue * (currentStep + 1))
          }));
          currentStep++;
        }
      }, interval);
    });

    // Cleanup intervals
    return () => counters.forEach(counter => clearInterval(counter));
  }, []);
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
            <Link to="/dashboard" className="btn-get-started">
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
            <Link to="/features" className="read-more">
              <span>Discover More</span>
              <span className="arrow-icon">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
    <section className="counts section light-background">
      <div className="container">
        <div className="stats-row">
          <div className="stats-item">
            <div className="stats-content">
              <span className="purecounter">{counts.users}</span>
              <p>Active Users</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-content">
              <span className="purecounter">{counts.portfolios}</span>
              <p>Portfolios Created</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-content">
              <span className="purecounter">{counts.market}</span>
              <p>Market Insights Delivered</p>
            </div>
          </div>

          <div className="stats-item">
            <div className="stats-content">
              <span className="purecounter">{counts.admins}</span>
              <p>Admins Supporting the Platform
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="why-us" className="why-us section">
      <div className="container">
        <div className="row">
          {/* Left Box */}
          <div className="why-box-container">
            <div className="why-box">
              <h3>Why Choose RoboAdvisor for Your Portfolio?</h3>
              <p>
              Our portfolio management tools are designed to provide you with automated, efficient, 
              and personalized investment strategies. Whether you're starting your financial journey 
              or managing an established portfolio, RoboAdvisor simplifies the process and maximizes your returns.
              </p>
              <div className="text-center">
                <Link to="/portfolios" className="more-btn">
                  <span>Learn More</span>
                  <span className="chevron-right">›</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
  
  
}

export default Home;