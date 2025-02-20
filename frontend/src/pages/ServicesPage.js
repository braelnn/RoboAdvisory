import React from "react";
import "./ServicesPage.css";
import Header from "../components/Header";
import { 
  FaUserShield, FaChartLine, FaMoneyBillWave, FaTools, FaBell, 
  FaClipboardList, FaDatabase, FaLock, FaUsersCog, FaGlobe, 
  FaMobileAlt, FaCloud, FaSyncAlt 
} from "react-icons/fa"; // Icons for Services

const ServicesPage = () => {
  const services = [
    {
      icon: <FaUserShield className="icon" />,
      title: "Secure Authentication",
      description: "Protect your financial data with top-tier security, including JWT authentication, encrypted storage, and multi-factor authentication.",
    },
    {
      icon: <FaChartLine className="icon" />,
      title: "Real-Time Market Insights",
      description: "Stay ahead with live market data, AI-driven insights, and up-to-date trends for informed investment decisions.",
    },
    {
      icon: <FaMoneyBillWave className="icon" />,
      title: "Automated Portfolio Management",
      description: "Create, manage, and optimize investment portfolios with automated asset allocation tailored to your risk tolerance.",
    },
    {
      icon: <FaTools className="icon" />,
      title: "Advanced Admin Tools",
      description: "Gain full control with a feature-rich admin dashboard to monitor system health, manage users, and track analytics.",
    },
    {
      icon: <FaBell className="icon" />,
      title: "Instant Notifications",
      description: "Receive real-time alerts on portfolio updates, market fluctuations, and key financial events.",
    },
    {
      icon: <FaClipboardList className="icon" />,
      title: "Comprehensive Investment Reports",
      description: "Generate and download detailed reports for portfolio performance, market trends, and financial planning.",
    },
    {
      icon: <FaDatabase className="icon" />,
      title: "Robust Data Integration",
      description: "Seamlessly integrate historical and real-time financial data from trusted sources to enhance decision-making.",
    },
    {
      icon: <FaLock className="icon" />,
      title: "Bank-Level Security",
      description: "We implement cutting-edge security protocols, encrypted data storage, and secure API connections for your peace of mind.",
    },
    {
      icon: <FaUsersCog className="icon" />,
      title: "User Role Management",
      description: "Manage different user roles, including investors, financial advisors, and administrators with precise access control.",
    },
    {
      icon: <FaSyncAlt className="icon" />,
      title: "Seamless API Integration",
      description: "Leverage our APIs to connect your existing systems with financial market data, investment models, and user analytics.",
    },
  ];

  return (
    <div className="servy">
        <Header />
        <div className="services-page">
        <header>
            <h1>Our Premium Services</h1>
            <p>Empowering investors with AI-driven financial insights, cutting-edge security, and a seamless digital experience.</p>
        </header>

        <div className="services-container">
            {services.map((service, index) => (
            <div key={index} className="service-card">
                {service.icon}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
            ))}
        </div>
        </div>
    </div>
  );
};

export default ServicesPage;
