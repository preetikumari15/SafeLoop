import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const prompts = [
  { icon: "👀", text: "Notice 5 things you can see." },
  { icon: "🖐️", text: "Touch 4 things. Focus on how they feel." },
  { icon: "👂", text: "Listen for 3 different sounds." },
  { icon: "👃", text: "Find 2 things you can smell." },
  { icon: "👅", text: "Focus on 1 thing you can taste." },
];

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-100 to-white p-8 text-center">
      <h2 className="text-4xl font-semibold text-green-800 mb-6">
        Ground Yourself 🌿
      </h2>
      <h2 className="text-3xl font-semibold text-green-800 mb-6">
        I'm here with you!
        </h2>

      <div className="mb-8 text-sm text-gray-500">
        Step {index + 1} of {prompts.length}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md mb-8 border border-green-200"
        >
          <div className="text-5xl mb-4">{prompts[index].icon}</div>
          <p className="text-lg text-gray-700">{prompts[index].text}</p>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={handleNext}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full transition-all shadow-md"
      >
        {index === prompts.length - 1 ? "Finish Grounding" : "Done ✅"}
      </button>

      <audio ref={audioRef} src="/rain.mp3" loop />
    </div>
  );
};

export default Step2_Grounding;

