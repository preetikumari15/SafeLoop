import React, { useEffect, useRef } from "react";

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
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 p-8 text-center relative overflow-hidden">
      <img
        src="/water.png"
        alt="Glass of Water"
        className="w-48 md:w-64 transform rotate-12 drop-shadow-xl z-10 mb-8"
      />

      <h1 className="text-4xl md:text-4xl font-semibold text-blue-500 mb-4 z-10">
        Drink some water
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 z-10">
        You're safe! This will pass too.
      </p>

      <audio ref={audioRef} src="/rain.mp3" loop />

      <button
        onClick={next}
        className="mt-8 bg-sky-200 hover:bg-sky-400 text-gray px-6 py-3 rounded-full shadow-md transition-all z-10"
      >
        Continue
      </button>
    </div>
  );
};

export default Step3_DrinkWater;
