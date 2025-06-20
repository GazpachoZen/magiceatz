import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/magiceatz/" className="logo-link">
          <img src="./images/logo_full_160.png" alt="MagicEatz Logo" className="logo-image" />
        </Link>
      </div>
      <div className="nav-container">
        <div
          className="nav-button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <img
            src="./images/nav_bars_160.png"
            alt="Menu"
            className="nav-icon"
          />
        </div>
        {menuOpen && (
          <nav className="dropdown-menu">
            <Link to="/magiceatz/" className="dropdown-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/magiceatz/chat" className="dropdown-link" onClick={() => setMenuOpen(false)}>Chat</Link>
            <Link to="/magiceatz/testdb" className="dropdown-link" onClick={() => setMenuOpen(false)}>Test DB</Link>
          </nav>
        )}      </div>
    </header>
  );
}

export default Header;