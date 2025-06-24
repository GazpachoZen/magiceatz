import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Check if user is signed in
    const userData = localStorage.getItem('magiceatz_user');
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Listen for storage changes (when user signs in from another tab/component)
  useEffect(() => {
    const handleStorageChange = () => {
      const userData = localStorage.getItem('magiceatz_user');
      setCurrentUser(userData ? JSON.parse(userData) : null);
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom event when user signs in on same page
    window.addEventListener('magiceatz-user-changed', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('magiceatz-user-changed', handleStorageChange);
    };
  }, []);

  // Handle click outside dropdown to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleSignOut = () => {
    localStorage.removeItem('magiceatz_user');
    setCurrentUser(null);
    setMenuOpen(false);
    // Dispatch custom event to notify other components
    window.dispatchEvent(new CustomEvent('magiceatz-user-changed'));
    // Add navigation to home page
    navigate('/magiceatz/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/magiceatz/" className="logo-link">
          <img src="/magiceatz/images/logo_full_160.png" alt="MagicEatz Logo" className="logo-image" />
        </Link>
      </div>
      <div className="nav-container" ref={dropdownRef}>
        <div
          className="nav-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src="/magiceatz/images/nav_bars_160.png"
            alt="Menu"
            className="nav-icon"
          />
        </div>
        {menuOpen && (
          <nav className="dropdown-menu">
            <Link to="/magiceatz/" className="dropdown-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/magiceatz/chat" className="dropdown-link" onClick={() => setMenuOpen(false)}>Chat</Link>
            <Link to="/magiceatz/testdb" className="dropdown-link" onClick={() => setMenuOpen(false)}>Test DB</Link>
            <Link to="/magiceatz/sid-overview" className="dropdown-link" onClick={() => setMenuOpen(false)}>About SID</Link>
            {currentUser ? (
              <button 
                onClick={handleSignOut}
                className="dropdown-link"
                style={{ border: 'none', background: 'none', width: '100%', textAlign: 'left' }}
              >
                Sign Out ({currentUser.first_name})
              </button>
            ) : (
              <Link to="/magiceatz/signin" className="dropdown-link" onClick={() => setMenuOpen(false)}>Sign In</Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;