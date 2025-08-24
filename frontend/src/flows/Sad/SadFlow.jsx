import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const FloatingHearts = ({ count = 80 }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute text-pink-500/20 animate-float"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
      }}
    >
      💝
    </div>
  ));
};

const SadFlow = () => {
  const [showPlaylist, setShowPlaylist] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    const playAudio = async () => {
      try {
        if (audio) {
          await audio.play();
          audio.volume = 0.3;
        }
      } catch (err) {
        console.error("Audio play error:", err);
      }
    };

    playAudio();

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleWriteClick = () => {
    navigate("/journal");
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-pink-900/50" />
        <FloatingHearts />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-shadow-lg mb-8">
            Hey there 💜
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 text-shadow leading-relaxed mb-12">
            I just wanted to remind you that you don't have to go through this alone.
            It's okay to feel what you're feeling, and you don't have to hide it or explain it away.
            <br /><br />
            You've made it through hard days before, and you will again, but for now, 
            just take one breath, one moment at a time. I'm here. No pressure to talk, 
            but if you want to, I'm listening. Always. 🌿
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button
              onClick={handleWriteClick}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl
                border border-white/20 text-white hover:bg-white/20 
                transition-all duration-300 text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-white/50"
            >
              ✍️ Write it out
            </button>
            
            <button
              onClick={() => setShowPlaylist(!showPlaylist)}
              className="px-8 py-4 bg-purple-500/20 backdrop-blur-sm rounded-xl
                border border-purple-500/30 text-white hover:bg-purple-500/30 
                transition-all duration-300 text-xl font-medium
                hover:scale-105 focus:outline-none focus:ring-2 
                focus:ring-purple-500/50"
            >
              🎵 {showPlaylist ? "Hide Playlist" : "Listen to Music"}
            </button>
          </div>

          {showPlaylist && (
            <div className="mt-12 space-y-6 animate-fade-in">
              <div className="aspect-video rounded-xl overflow-hidden border border-white/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/ON5AAcbiW2M"
                  title="Calm Piano Music"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border border-white/20">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/E5pPOdHXm48"
                  title="Peaceful Nature Sounds"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </div>

        <audio ref={audioRef} src="/ambient.mp3" loop preload="auto" />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.4; }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
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

export default SadFlow;