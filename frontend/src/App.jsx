import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const navigate = useNavigate();
  const emotions = [
    { emoji: "😰", label: "Panic/Anxiety", route: "/flow/panic" },
    { emoji: "😢", label: "Sad", route: "/flow/sad" },
    { emoji: "😶", label: "Numb", route: "/flow/numb" },
    { emoji: "💭", label: "Overthinking", route: "/flow/overthinking" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased">
      <DreamyBackground />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center pt-24">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 text-white text-shadow-lg leading-snug">
            Hey! What happened?
          </h1>
          <h2 className="text-lg sm:text-xl md:text-3xl font-bold mb-6 sm:mb-8 md:mb-10 text-slate-300 text-shadow leading-relaxed">
            Tell me, how are you feeling?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-10 w-full max-w-3xl">
            {emotions.map((emotion, index) => (
              <button
                key={index}
                onClick={() => navigate(emotion.route)}
                className="flex flex-col items-center justify-center 
                  p-6 sm:p-8 md:p-12 
                  bg-white/10 rounded-xl shadow-lg 
                  hover:scale-105 transition 
                  text-base sm:text-lg md:text-xl text-white 
                  border border-white/20 
                  hover:bg-white/20 
                  backdrop-blur-sm 
                  focus:outline-none focus:ring-2 focus:ring-white/50 
                  animate-pulse-glow"
              >
                <span className="text-3xl sm:text-4xl md:text-6xl block mb-2 sm:mb-3">
                  {emotion.emoji}
                </span>
                {emotion.label}
              </button>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

const Sparkles = ({ count = 200 }) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 2}s`,
      };
      return <div key={i} className="sparkle" style={style} />;
    });
  }, [count]);

  return <>{sparkles}</>;
};

const DreamyBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900">
      <Sparkles count={70} />
      <div className="absolute inset-0 filter blur-3xl brightness-75">
        <div
          className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-500/50 rounded-full"
          style={{ animation: "float 25s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-purple-600/50 rounded-full"
          style={{ animation: "float 20s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-blue-500/40 rounded-full"
          style={{ animation: "float 30s ease-in-out infinite", animationDelay: "5s" }}
        />
        <div
          className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-teal-500/30 rounded-full"
          style={{ animation: "float 22s ease-in-out infinite", animationDelay: "10s" }}
        />
      </div>

      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(20px); }
          100% { transform: translateY(0px) translateX(0px); }
        }

        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          }
          50% {
            transform: scale(1.02);
            box-shadow: 0 0 35px rgba(255, 255, 255, 0.25);
          }
        }

        .sparkle {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          opacity: 0;
          animation-name: twinkle;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1); }
        }

        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
      `}</style>
    </div>
  );
};

export default App;
