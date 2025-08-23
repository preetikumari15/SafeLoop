import React, { useState, useMemo, useCallback, useRef } from "react";

const Sparkles = ({ count = 80 }) => {
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
  <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900">
    <Sparkles count={50} />
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
        @keyframes float { 0% { transform: translateY(0px) translateX(0px); } 50% { transform: translateY(-20px) translateX(20px); } 100% { transform: translateY(0px) translateX(0px); } }
        .animate-fade-in-up { animation: fadeInUp 1s ease-out forwards; opacity: 0; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .sparkle { position: absolute; width: 2px; height: 2px; background-color: white; border-radius: 50%; opacity: 0; animation-name: twinkle; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes twinkle { 0%, 100% { opacity: 0; transform: scale(0.5); } 50% { opacity: 0.8; transform: scale(1); } }
        .text-shadow { text-shadow: 0 2px 4px rgba(0,0,0,0.4); }
        .text-shadow-lg { text-shadow: 0 4px 10px rgba(0,0,0,0.5); }
        .pointer-sparkle { position: fixed; z-index: 9999; width: 5px; height: 5px; border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%); animation: fade-out-sparkle 1s forwards; }
        @keyframes fade-out-sparkle { to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); } }
    `}</style>
  </div>
);

export default function Step2_Create({onNext}) {
  const synth = useRef(null);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const sparkleColors = ["#a7c7e7", "#f2b5d4", "#d8b4f8", "#fffac8", "#bde0fe"];

  const lastSparkleTime = useRef(0);
  const throttleInterval = 100; 

  const initializeAudio = async () => {
    if (window.Tone && !isAudioReady) {
      await window.Tone.start();
      synth.current = new window.Tone.PolySynth(window.Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.1, release: 1 },
      }).toDestination();
      synth.current.set({ volume: -10 });
      setIsAudioReady(true);
    }
  };


  const createSparkle = useCallback((x, y) => {
    if (synth.current) {
      const note = ["C5", "E5", "G5", "A5"][Math.floor(Math.random() * 4)];
      synth.current.triggerAttackRelease(note, "8n");
    }

    const sparkle = document.createElement("div");
    sparkle.className = "pointer-sparkle";
    sparkle.style.top = `${y}px`;
    sparkle.style.left = `${x}px`;

    const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    sparkle.style.background = color;
    sparkle.style.boxShadow = `0 0 8px 2px ${color}`;

    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 1000);
  }, []);

  const handlePointerMove = (e) => {
    if (!isAudioReady) initializeAudio();
    createSparkle(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (!isAudioReady) initializeAudio();
    for (let i = 0; i < e.touches.length; i++) {
      createSparkle(e.touches[i].clientX, e.touches[i].clientY);
    }
  };

  return (
     <div 
      className="relative min-h-screen bg-slate-900 font-sans antialiased"
      onMouseMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      onMouseDown={initializeAudio}
    >
      <DreamyBackground />

      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center p-4 text-center">
        <h2 className="text-5xl md:text-7xl font-semibold text-white mb-10 text-shadow-lg animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            Paint with Starlight 🎨
        </h2>
        <p className="text-slate-300 text-2xl md:text-3xl mb-8 leading-relaxed max-w-3xl text-shadow animate-fade-in-up" style={{ animationDelay: "1s" }}>
          Gently move your cursor or finger across the screen.
          <br />
          Create your own little galaxy of color and sound.
        </p>
        <button
            onClick={onNext}
            className="px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
              border border-white/20 text-white hover:bg-white/50 
              transition-all duration-300 text-xl font-medium
              hover:scale-105 focus:outline-none focus:ring-2 
              focus:ring-white/50" 
          >
            Continue ✨
          </button>
      </div>
    </div>
  );
}
