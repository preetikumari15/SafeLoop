import { useEffect, useRef, useState, useMemo } from "react";

const SparklingHearts = ({ count = 90 }) => {
  const hearts = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      size: `${Math.random() * 1 + 0.5}rem`
    }));
  }, [count]);

  return hearts.map(heart => (
    <div
      key={heart.id}
      className="absolute text-pink-500/30 animate-float"
      style={{
        left: heart.left,
        top: heart.top,
        animationDelay: heart.animationDelay,
        fontSize: heart.size
      }}
    >
      💖
    </div>
  ));
};

const Step1_Breathing = ({ next }) => {
  const audioRef = useRef(null);
  const [phase, setPhase] = useState("Inhale");
  const [countdown, setCountdown] = useState(4);
  const [isCompleted, setIsCompleted] = useState(false);

  const phases = [
    { label: "Inhale", duration: 4 },
    { label: "Hold", duration: 4 },
    { label: "Exhale", duration: 4 },
  ];

  useEffect(() => {
    let current = 0;
    let cycle = 0;
    let phaseTimeout;
    let countdownInterval;
    let restTimeout;

    const startPhase = () => {
      const { label, duration } = phases[current];
      setPhase(label);
      setCountdown(duration);

      countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) clearInterval(countdownInterval);
          return prev - 1;
        });
      }, 1000);

      phaseTimeout = setTimeout(() => {
        clearInterval(countdownInterval);
        current = (current + 1) % phases.length;

        if (current === 0) {
          cycle++;
          if (cycle === 3) {
            setPhase("Nice work 💙");
            setCountdown(0);
            setIsCompleted(true);
            setTimeout(() => {
              next(); 
            }, 2000);
            return;
          }

          setPhase();
          setCountdown();
          restTimeout = setTimeout(startPhase, 1000);
          return;
        }

        startPhase();
      }, duration * 1000);
    };

    if (audioRef.current) {
      audioRef.current.play().catch((err) => console.warn("Autoplay failed:", err));
    }

    startPhase();

    return () => {
      clearTimeout(phaseTimeout);
      clearTimeout(restTimeout);
      clearInterval(countdownInterval);

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, [next]);

    return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased">
     
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-slate-900 to-indigo-900/50" />
        <SparklingHearts count={30} />
      </div>

      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <h2 className="text-8xl font-bold mb-12 text-white text-shadow-lg">
          Let's Breathe Together
        </h2>

       
        <div className="relative w-40 h-40 mb-10">
          <div 
            className={`absolute inset-0 flex items-center justify-center text-8xl
              ${phase === "Inhale" ? "animate-heart-expand" : 
                phase === "Exhale" ? "animate-heart-contract" : 
                "animate-heart-pulse"}`}
          >
            <div className="relative">
              <span className="absolute inset-0 text-pink-500/50 animate-glow filter blur-md">❤️</span>
              <span className="relative text-pink-500">❤️</span>
            </div>
          </div>
        </div>

        <p className="mb-8 text-5xl font-medium text-slate-300 text-shadow">
          {phase}
          {countdown > 0 && (
            <span className="ml-4 font-bold text-white">
              {countdown}
            </span>
          )}
        </p>
        <audio ref={audioRef} src="/breathing.mp3" loop />

        {!isCompleted && (
          <button
            onClick={next}
            className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-sm rounded-xl
              border border-white/20 text-white hover:bg-white/20 
              transition-all duration-300 text-xl font-medium
              hover:scale-105 focus:outline-none focus:ring-2 
              focus:ring-white/50"
          >
            Continue →
          </button>
        )}
      </div>

      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
          50% { transform: translateY(-20px) rotate(10deg); opacity: 0.6; }
        }

        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(4px); }
          50% { opacity: 0.8; filter: blur(8px); }
        }

        @keyframes heart-expand {
          from { transform: scale(1); }
          to { transform: scale(1.3); }
        }

        @keyframes heart-contract {
          from { transform: scale(1.3); }
          to { transform: scale(1); }
        }

        @keyframes heart-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-heart-expand {
          animation: heart-expand 4s ease-in-out infinite;
        }
        
         .animate-heart-contract {
          animation: heart-contract 4s ease-in-out infinite;
        }

        .animate-heart-pulse {
          animation: heart-pulse 2s ease-in-out infinite;
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

export default Step1_Breathing;
