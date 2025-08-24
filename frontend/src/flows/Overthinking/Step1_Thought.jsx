import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingThoughts = ({ count = 30 }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute text-purple-500/20 animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      💭
    </div>
  ));
};

const Step1_Thought = ({ onNext }) => {
  const navigate = useNavigate();

  const onPlayGame = () => {
    onNext("game");
  };

  const onWrite = () => {
    navigate("/journal");
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-pink-600/50" />
        <FloatingThoughts />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 sm:p-12 max-w-4xl w-full">
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-pink-300 text-shadow-lg mb-6 sm:mb-10 leading-snug">
            Hey! overthinking again? 💭
          </h1>

          <p className="text-lg sm:text-2xl lg:text-3xl text-slate-300 text-shadow leading-relaxed mb-8 sm:mb-12">
            It's okay. Your mind is just trying to keep up. You're not alone in
            this.
          </p>

          <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 sm:p-8 mb-8 sm:mb-12">
            <p className="italic text-purple-300 text-shadow text-lg sm:text-2xl">
              "You don't have to believe every thought that visits your mind."
            </p>
          </div>
       
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button
              onClick={onPlayGame}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-pink-500/20 backdrop-blur-sm rounded-xl
                border border-pink-500/30 text-white hover:bg-pink-300/70 
                transition-all duration-300 text-base sm:text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-pink-500/50"
            >
              🎮 Let's play a game
            </button>

            <button
              onClick={onWrite}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white/10 backdrop-blur-sm rounded-xl
                border border-white/20 text-white hover:bg-white/60 
                transition-all duration-300 text-base sm:text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-white/50"
            >
              📝 Write about it
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
            opacity: 0.4;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Step1_Thought;
