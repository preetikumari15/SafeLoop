import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const Step4_Final = () => {
    const handleWriteClick = () => {
      window.location.href = "/journal"; 
    };

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
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 via-blue-50 to-white text-center p-8 relative">
      
      <h1 className="text-5xl font-semibold text-blue-600 mb-12">
        You’re doing great 💙
      </h1>

      <p className="text-xl text-cray-700 mb-10 max-w-xl">
        If you feel like talking to someone or writing down your thoughts,
        we’re here for you.
      </p>

      <audio ref={audioRef} src="/rain.mp3" loop />

      <div className="flex gap-6 flex-wrap justify-center">
        <button onClick={handleWriteClick}
          className="bg-white border border-blue-400 text-blue-500 px-8 py-4 rounded-full shadow hover:bg-blue-50 transition-all"
        >
          Write in Journal 📝
        </button>

        <Link
          to="https://wa.me/9990737980"
          className="bg-pink-200 border border-pink-300 text-blue-600 px-8 py-4 rounded-full shadow hover:bg-pink-300 transition-all"
        >
          Talk to Someone 💬
        </Link>
      </div>

      <div className="absolute bottom-4 right-4 text-md text-rose-600 bg-white/70 px-4 py-2 rounded-md shadow">
      <a href="tel:08001234567" className="hover:underline">
        💡 Helpline: <strong>0800-123-4567</strong>
      </a>
      </div>
    </div>
  );
};

export default Step4_Final;
