import React, { useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, LogOut, User, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../ui/Button';

const Navbar: React.FC = () => {
  const { currentUser, signOut } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    closeMenu();
  };

  // Navigation links with active state
  const navLinks = [
    { name: 'Dashboard', path: '/', icon: <BarChart2 size={18} /> },
    { name: 'Profile', path: '/profile', icon: <User size={18} /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* <Link to="/" className="flex-shrink-0 flex items-center" onClick={closeMenu}> */}
            <div className="h-8 w-8 bg-primary-500 text-white rounded flex items-center justify-center">
              <BarChart2 size={20} />
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">EventDash</span>
            {/* </Link> */}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {currentUser && (
              <div className="flex items-center space-x-4">
                {/* {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${location.pathname === link.path
                      ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                  >
                    <span className="mr-1.5">{link.icon}</span>
                    {link.name}
                  </Link>
                ))} */}

                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="sm"
                  className="ml-2"
                  icon={<LogOut size={18} />}
                >
                  Sign Out
                </Button>
              </div>
            )}

            {!currentUser && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                  aria-label="Toggle theme"
                >
                  {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                {/* <Link to="/login"> */}
                <Button variant="primary" size="sm" icon={<LogOut size={18} />}>
                  Sign In
                </Button>
                {/* </Link> */}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button
              onClick={toggleMenu}
              className="ml-2 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Open menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {currentUser ? (
              <>
                {/* {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === link.path
                      ? 'text-primary-500 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    onClick={closeMenu}
                  >
                    <span className="mr-2">{link.icon}</span>
                    {link.name}
                  </Link>
                ))} */}

                <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    onClick={handleSignOut}
                    variant="ghost"
                    fullWidth
                    className="mt-1 justify-start"
                    icon={<LogOut size={18} />}
                  >
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <></>
              // <Link
              //   to="/login"
              //   className="block px-3 py-2 rounded-md text-base font-medium text-primary-500 dark:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              //   onClick={closeMenu}
              // >
              //   Sign In
              // </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;