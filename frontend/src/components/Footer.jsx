import React from "react";

const Footer = () => {
  const handleAlert = () => {
    alert("🚨 Alert sent to your saved emergency contact.");
  };

  return (
    <footer className="fixed bottom-0 w-full bg-white text-green-800 px-6 py-4 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left text-md font-medium">
          You are safe here. One breath at a time. 💚
        </div>
         <span className="text-xs text-gray-500">&copy; {new Date().getFullYear()} SafeLoop</span>

        <div className="flex space-x-4 text-md">
          <a
            href="/journal"
            className="text-green-700 hover:underline hover:text-green-900"
          >
            📓 Journal
          </a>

          <a
            href="tel:9152987821"
            className="text-green-700 hover:underline hover:text-green-900"
          >
            ☎️ 24x7 Helpline
          </a>

          <button
            onClick={handleAlert}
            className="text-red-600 hover:underline font-semibold"
          >
            🚨 Send Alert
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


