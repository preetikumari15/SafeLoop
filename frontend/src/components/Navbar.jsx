import React, { useEffect, useState } from "react";

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
    <nav className="fixed top-0 w-full z-50 bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <div className="flex items-center space-x-4 ml-10">
        <img src="png.jpg" alt="SafeLoop Logo" className="h-10 w-10" />
        <span className="text-xl font-bold text-green-700">SafeLoop</span>
      </div>

      <div className="mr-10">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition mr-10 font-medium"
          >
            Logout
          </button>
        ) : (
          <a href="/signup">
            <button className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition mr-10 font-medium">
              Register
            </button>
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
