import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-green-200 p-4 shadow">
      <div className="flex items-center justify-between">
        <Link to="/magiceatz/" className="flex items-center space-x-3">
          <img src="./images/logo.png" alt="MagicEatz Logo" className="h-10 w-10" />
          <span className="text-xl font-bold text-green-900">MagicEatz</span>
        </Link>
        <button
          className="text-green-800 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <nav className="mt-2 space-y-2">
          <Link to="/magiceatz/" className="block text-green-800 hover:underline">Home</Link>
          <Link to="/magiceatz/chat" className="block text-green-800 hover:underline">Chat</Link>
          <Link to="/magiceatz/testdb" className="block text-green-800 hover:underline">Test DB</Link>
        </nav>
      )}
    </header>
  );
}

export default Header;

