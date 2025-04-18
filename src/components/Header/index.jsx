import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-9" alt="Inkspire Logo" />
          <span className="text-2xl font-bold text-gray-900">Inkspire</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-between w-full">
          <ul className="flex gap-8 text-lg font-semibold text-gray-800 mx-auto">
            {[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: "About", path: "/about" }
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `relative group transition-all duration-300 hover:text-purple-700 ${
                      isActive ? 'text-purple-700' : ''
                    }`
                  }
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-purple-600 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Buttons */}
          <div className="flex gap-4">
            <button className="px-4 py-1.5 text-purple-600 font-semibold border border-purple-600 rounded-full hover:bg-purple-50 transition">
              Login
            </button>
            <button className="px-4 py-1.5 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition">
              Sign Up
            </button>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 hover:text-purple-600 transition-colors"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <ul className="flex flex-col gap-4 text-lg font-semibold text-gray-800">
            {[
              { name: "Home", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: "About", path: "/about" }
            ].map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `block py-2 transition-all duration-300 hover:text-purple-700 ${
                      isActive ? 'text-purple-700' : ''
                    }`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3 pt-2">
            <button className="w-full px-4 py-2 text-purple-600 font-semibold border border-purple-600 rounded-full hover:bg-purple-50 transition">
              Login
            </button>
            <button className="w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
