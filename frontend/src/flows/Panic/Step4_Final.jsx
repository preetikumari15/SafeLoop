import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const FloatingStars = ({ count = 30 }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute text-yellow-500/30 animate-twinkle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      ✨
    </div>
  ));
};

const Step4_Final = () => {
  const [showYesOptions, setShowYesOptions] = useState(false);
  const [showNoOptions, setShowNoOptions] = useState(false);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.error("Audio play error:", err));
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleWriteClick = () => {
    navigate('/journal');
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-purple-900/50" />
        <FloatingStars />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-12 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 max-w-3xl">
          <h1 className="text-7xl font-bold text-white text-shadow-lg mb-10">
            You're doing great 💙
          </h1>

          <p className="text-2xl text-slate-300 text-shadow mb-12">
            Are you feeling better now?
          </p>

          <div className="flex justify-center gap-6 mb-12">
            <button
              onClick={() => {
                setShowYesOptions(true);
                setShowNoOptions(false);
              }}
              className="px-8 py-3 bg-green-500/20 backdrop-blur-sm rounded-xl
                border border-green-500/30 text-white hover:bg-green-300/70 
                transition-all duration-300 text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-green-500/50"
            >
              Yes ✨
            </button>
            <button
              onClick={() => {
                setShowNoOptions(true);
                setShowYesOptions(false);
              }}
              className="px-8 py-3 bg-pink-500/20 backdrop-blur-sm rounded-xl
                border border-pink-500/30 text-white hover:bg-pink-300/80 
                transition-all duration-300 text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-pink-500/50"
            >
              Not Yet 🌸
            </button>
          </div>

          {showYesOptions && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <button
                onClick={handleWriteClick}
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
                  border border-white/20 text-white hover:bg-white/40 
                  transition-all duration-300 text-lg font-medium"
              >
                Wanna write something 📝
              </button>

              <Link
                to="/"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
                  border border-white/20 text-white hover:bg-white/40 
                  transition-all duration-300 text-lg font-medium"
              >
                Back to Home 🏠
              </Link>
            </div>
          )}

          {showNoOptions && (
            <div className="flex flex-col gap-6 animate-fade-in">
              <Link
                to="https://wa.me/9990737980"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
                  border border-white/20 text-white hover:bg-white/40 
                  transition-all duration-300 text-lg font-medium"
              >
                Talk to Someone 💬
              </Link>

              <a
                href="tel:18001234567"
                className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
                  border border-white/20 text-white hover:bg-white/40 
                  transition-all duration-300 text-lg font-medium"
              >
                Call Helpline ☎️
              </a>
            </div>
          )}
        </div>
         <audio ref={audioRef} src="/rain.mp3" loop />
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }
      `}</style>
    </div>
  );
};

export default Step4_Final;