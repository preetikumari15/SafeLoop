import React, { useEffect, useRef } from "react";

const WaterDrops = ({ count = 30 }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute text-blue-500/30 animate-drop"
      style={{
        left: `${Math.random() * 100}%`,
        top: `-20px`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${Math.random() * 2 + 2}s`
      }}
    >
      💧
    </div>
  ));
};

const Step3_DrinkWater = ({ next }) => {
  const audioRef = useRef(null);

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

  return (
  <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
    <div className="fixed inset-0 z-0">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-indigo-900/50" />
      <WaterDrops />
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 md:p-12 text-center">
      <div>
        <div className="relative mb-6 sm:mb-8">
          <span className="absolute inset-0 text-6xl sm:text-8xl md:text-9xl animate-float filter blur-md opacity-50">
            🥤
          </span>
          <span className="relative text-6xl sm:text-8xl md:text-9xl animate-float">
            🥤
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white text-shadow-xl mb-4 sm:mb-6 md:mb-8">
          Drink some water
        </h1>
        
        <p className="text-lg sm:text-2xl md:text-3xl text-slate-300 text-shadow mb-6 sm:mb-8 md:mb-10">
          You're safe! This will pass too. 💙
        </p>

        <button
          onClick={next}
          className="px-6 sm:px-8 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-xl
            border border-white/20 text-white hover:bg-white/20 
            transition-all duration-300 text-lg sm:text-xl font-medium
            hover:scale-105 focus:outline-none focus:ring-2 
            focus:ring-white/50"
        >
          Continue ✨
        </button>
      </div>

        <audio ref={audioRef} src="/rain.mp3" loop />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes drop {
          0% { transform: translateY(-20px); opacity: 0; }
          50% { opacity: 0.6; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-drop {
          animation: drop 3s linear infinite;
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

export default Step3_DrinkWater;