// src/pages/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6  bg-gradient-to-r from-purple-100 to-blue-100">
      <h1 className="text-6xl font-bold text-purple-700 mb-4">404 😵</h1>
      <p className="text-2xl text-gray-800 font-semibold mb-2">Oops! You’ve wandered into the void 🕳️</p>
      <p className="text-gray-600 text-lg mb-6 max-w-xl">
        This page doesn’t exist... yet. Maybe it’s hiding behind a blog post or taking a coffee break ☕
      </p>
      <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg">
        🏠 Back to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
