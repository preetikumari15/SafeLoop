import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

  return (
    <footer className="w-full bg-white/10 backdrop-blur-sm text-slate-300 px-6 py-4 border-t border-white/20 z-50">
      <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

        <div className="text-center md:text-left text-md font-medium">
          <span className="text-shadow">You are safe here. One breath at a time. 💚</span>
        </div>

        <span className="text-xs text-slate-400 text-center">
          &copy; {new Date().getFullYear()} SafeLoop
        </span>

        <div className="flex flex-wrap justify-center md:justify-end gap-4 text-md">
          <Link
            to="/journal"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            📓 Journal
          </Link>

          <a
            href="tel:9152987821"
            className="text-slate-300 hover:text-white transition-colors duration-200"
          >
            ☎️ 24x7 Helpline
          </a>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;


