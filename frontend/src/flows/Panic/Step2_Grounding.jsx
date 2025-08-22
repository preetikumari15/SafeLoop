import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const prompts = [
  { icon: "👀", text: "Notice 5 things you can see." },
  { icon: "🖐️", text: "Touch 4 things. Focus on how they feel." },
  { icon: "👂", text: "Listen for 3 different sounds." },
  { icon: "👃", text: "Find 2 things you can smell." },
  { icon: "👅", text: "Focus on 1 thing you can taste." },
];

const FloatingStars = ({ count = 80 }) => {
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

const Step2_Grounding = ({ next }) => {
  const [index, setIndex] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn("Audio play failed", err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const handleNext = () => {
    if (index < prompts.length - 1) {
      setIndex(index + 1);
    } else {
      next(); 
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-slate-900 to-purple-900/50" />
        <FloatingStars />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-8xl font-bold mb-5 text-white text-shadow-lg">
          Ground Yourself 🌿
        </h2>
        <h3 className="text-5xl font-medium mb-8 text-slate-300 text-shadow">
          I'm here with you!
        </h3>

        <div className="mb-8 text-slate-400">
          Step {index + 1} of {prompts.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-12 w-full max-w-lg mb-8"
          >
            <div className="text-7xl mb-6 animate-float">{prompts[index].icon}</div>
            <p className="text-3xl text-slate-300">{prompts[index].text}</p>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={handleNext}
          className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
            border border-white/20 text-white hover:bg-white/20 
            transition-all duration-300 text-xl font-medium
            hover:scale-105 focus:outline-none focus:ring-2 
            focus:ring-white/50"
         >
          {index === prompts.length - 1 ? "Finish Grounding ✨" : "Done ✅"}
        </button>

        <audio ref={audioRef} src="/rain.mp3" loop />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
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

export default Step2_Grounding;