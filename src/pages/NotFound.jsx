import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  
  return (
    <main className="p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p className="mb-6 text-gray-600">
        Sorry, the page you're looking for doesn't exist in the MagicEatz universe.
      </p>
      <Link 
        to="/magiceatz/" 
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-colors"
      >
        Return to Home
      </Link>
    </main>
  );
}

export default NotFound;