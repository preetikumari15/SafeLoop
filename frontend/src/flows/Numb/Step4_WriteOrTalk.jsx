import React, { useMemo } from 'react';
import { useNavigate } from "react-router-dom";

const Flowers = ({ count = 50 }) => {
  const flowerEmojis = ['🌸', '🌺', '🌼', '🌷'];
  const flowers = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 5 + 8}s`, // Slower fall
        animationDelay: `${Math.random() * 10}s`,
        fontSize: `${Math.random() * 1 + 1}rem`,
      };
      const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
      return (
        <div key={i} className="flower" style={style}>
          {emoji}
        </div>
      );
    });
  }, [count]);
  return <>{flowers}</>;
};

const FloralBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900">
    <Flowers count={30} />
    <div className="absolute inset-0 filter blur-3xl brightness-75">
      <div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-pink-500/50 rounded-full"
        style={{ animation: 'float 25s ease-in-out infinite' }}
      />
      <div
        className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-purple-600/50 rounded-full"
        style={{ animation: 'float 20s ease-in-out infinite reverse' }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-1/4 h-1/4 bg-blue-500/40 rounded-full"
        style={{ animation: 'float 30s ease-in-out infinite', animationDelay: '5s' }}
      />
    </div>
    <style jsx global>{`
        @keyframes float { 0% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(20px); } 100% { transform: translateY(0px) translateX(0px); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        
        /* New animation for the flowers */
        .flower {
            position: absolute;
            top: -10vh; /* Start above the screen */
            opacity: 0;
            animation-name: fall;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }
        @keyframes fall {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(110vh) rotate(360deg);
                opacity: 1;
            }
        }
    `}</style>
  </div>
);

const Step4_WriteOrTalk = () => {
  const navigate = useNavigate();
  const handleWrite = () => navigate("/journal");

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased">
      <FloralBackground />
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center p-4 text-center">
        
        <h2 
          className="text-4xl md:text-6xl font-semibold text-white mb-8 text-shadow-lg animate-fade-in-up" 
          style={{ animationDelay: "0.5s" }}
        >
          You can do this.
        </h2>

        <p 
          className="text-slate-300 text-xl md:text-2xl mb-12 leading-relaxed max-w-3xl text-shadow animate-fade-in-up" 
          style={{ animationDelay: "1s" }}
        >
          It’s okay to feel what you’re feeling. You don’t have to hide it.
          <br />
          Take one breath, one moment at a time. If you want to share, I'm here to listen. Always. 🌿
        </p>

        <div 
          className="flex gap-6 flex-col sm:flex-row animate-fade-in-up"
          style={{ animationDelay: "1.5s" }}
        >
          <button
            onClick={handleWrite}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl
                       border border-white/20 text-white hover:bg-white/50 
                       transition-all duration-300 text-xl font-medium
                       hover:scale-105 focus:outline-none focus:ring-2 
                       focus:ring-white/50"
          >
            ✍️ Write it out
          </button>
          <a
            href="https://wa.me/9990737980" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-pink-500/50 backdrop-blur-sm rounded-xl
                       border border-pink-400/60 text-white hover:bg-pink-500/80 
                       transition-all duration-300 text-xl font-medium
                       hover:scale-105 focus:outline-none focus:ring-2 
                       focus:ring-white/50"
          >
            📞 Talk to someone
          </a>
        </div>
        
      </div>
    </div>
  );
};

export default Step4_WriteOrTalk;

