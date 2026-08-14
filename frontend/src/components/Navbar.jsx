import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 px-4 sm:px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
          <span className="text-xl sm:text-2xl font-bold text-white">
            🌟 SafeLoop
          </span>
        </Link>

        <div className="hidden sm:flex items-center space-x-6 sm:space-x-8">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            🏠 Home
          </Link>
          {isLoggedIn && (
            <Link
              to="/my-journal"
              className="text-slate-300 hover:text-white transition-colors duration-200"
            >
              📓 My Journals
            </Link>
          )}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <Link to="/signup">
              <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200">
                Register
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center gap-5">
          <Link
            to="/"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            🏠 Home
          </Link>

          {!isLoggedIn && (
            <Link
              to="/login"
              className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
            >
              Login
            </Link>
          )}

          {/* Hamburger */}
          {isLoggedIn && (
            <button
              className="text-white text-2xl focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "✖" : "☰"}
            </button>
          )}
        </div>
      </div>

      {menuOpen && isLoggedIn && (
        <div className="sm:hidden mt-4 px-4 pb-4 flex flex-col space-y-4 bg-white/10 backdrop-blur-md border-t border-white/20">
          <Link
            to="/my-journal"
            onClick={() => setMenuOpen(false)}
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            📓 My Journals
          </Link>

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200 text-left"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
