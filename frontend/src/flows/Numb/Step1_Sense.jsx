import React, { useMemo } from 'react';

const Sparkles = ({ count = 100 }) => {
  const sparkles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 2}s`,
        animationDelay: `${Math.random() * 5}s`,
      };
      return <div key={i} className="sparkle" style={style} />;
    });
  }, [count]);
  return <>{sparkles}</>;
};

const DreamyBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-purple-900 via-slate-700 to-orange-700">
    <Sparkles count={80} />
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
        .sparkle { position: absolute; width: 2px; height: 2px; background-color: white; border-radius: 50%; opacity: 0; animation-name: twinkle; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.8; transform: scale(1); } }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
    `}</style>
  </div>
);


const Step1_Sense = ({ onNext }) => {
  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased">
      <DreamyBackground />
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center p-4 text-center">

        <h2 
          className="text-4xl md:text-7xl font-semibold text-white mb-10 text-shadow-lg animate-fade-in-up" 
          style={{ animationDelay: "0.5s" }}
        >
          Hey, you're here. That matters.
        </h2>

        <p 
          className="text-slate-300 text-xl md:text-3xl mb-12 leading-relaxed max-w-3xl text-shadow animate-fade-in-up" 
          style={{ animationDelay: "1s" }}
        >
          It’s okay if you’re not feeling much right now.
          <br />Sometimes the world can feel distant, like you're behind a wall of glass.
          <br />
          Even in the quiet, you’re not alone. Let's begin gently.
        </p>

        <button
          onClick={onNext}
          className="px-8 py-3 bg-green-600 backdrop-blur-sm rounded-xl
                     border border-white/20 text-white hover:bg-green-500 
                     transition-all duration-300 text-xl font-medium
                     hover:scale-105 focus:outline-none focus:ring-2 
                     focus:ring-white/50 animate-fade-in-up"
          style={{ animationDelay: "1.5s" }}
        >
          Begin ✨
        </button>
        
      </div>
    </div>
  );
};

export default Step1_Sense;