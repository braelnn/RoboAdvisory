import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();




  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      setIsHeaderVisible(false);
    } else {
      setIsHeaderVisible(true);
    }
    
    setLastScrollTop(scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      const dropdowns = document.querySelectorAll('.dropdown ul');
      dropdowns.forEach(menu => menu.style.display = 'none');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleDropdown = (e) => {
    e.preventDefault();
    const parentLi = e.target.closest('li.dropdown');
    const dropdownMenu = parentLi.querySelector('ul');
    
    // Close other dropdowns
    document.querySelectorAll('.dropdown ul').forEach(menu => {
      if (menu !== dropdownMenu) {
        menu.style.display = 'none';
      }
    });

    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
  };

  useEffect(() => {
    // Fetch user details from local storage (or API if implemented)
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Remove user session
    setUser(null);
    navigate('/login'); // Redirect to login page
  };

  return (
    <header 
      id="header" 
      className={`header d-flex align-items-center sticky-top ${!isHeaderVisible ? 'header-hidden' : ''}`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center">
        <Link to="/" className="logo d-flex align-items-center me-auto">
          <h1 className="sitename">INVEST</h1>
        </Link>

        <nav id="navmenu" className={`navmenu ${isMobileMenuOpen ? 'mobile-nav-active' : ''}`}>
          <ul>
            <li>
              <Link to="/home" className={location.pathname === '/' ? 'active' : ''}>
                Home
              </Link>
            </li>
            {/* <li>
              <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                Dashboard
              </Link>
            </li> */}
            <li>
              <Link to="/portfolio" className={location.pathname === '/portfolios' ? 'active' : ''}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link to="/marketdata" className={location.pathname === '/features' ? 'active' : ''}>
                Market Data
              </Link>
            </li>
            <li>
              <Link to="/edit-profile" className={location.pathname === '/edit-profile' ? 'active' : ''}>
                Profile
              </Link>
            </li> 
            <li>
              <Link to="/reports" className={location.pathname === '/reports' ? 'active' : ''}>
                Reports
              </Link>
            </li>
            <li>
              <Link to="/contacts" className={location.pathname === '/contacts' ? 'active' : ''}>
                Contacts
              </Link>
            </li>
            <li>
              <Link to="/faq" className={location.pathname === '/faq' ? 'active' : ''}>
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <button
          className="mobile-nav-toggle d-xl-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {!user ? (
          <>
            <Link to="/login" className="login">Login</Link>
            <Link to="/register" className="signin">Register</Link>
          </>
        ) : (
          <div className="user-profile">
            <img src={user.profilePic || '/default-avatar.png'} alt="Profile" className="profile-pic" />
            <div className="username" onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user.username} ▼
            </div>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/edit-profile">Edit Profile</Link></li>
                <li onClick={handleLogout}>Log Out</li>
              </ul>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;