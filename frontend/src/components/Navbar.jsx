import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-sm border-b border-white/20 px-6 py-4">
      <div className="max-w-8xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <span className="text-2xl font-bold text-white">🌟 SafeLoop</span>
        </Link>

        <div className="flex items-center space-x-8">
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
      </div>
    </nav>
  );
};

export default Navbar;
