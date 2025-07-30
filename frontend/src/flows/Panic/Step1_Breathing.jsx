import { useEffect, useRef, useState } from "react";

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
    <div className="flex flex-col items-center justify-center w-screen h-screen p-8 text-center bg-gradient-to-b from-blue-100 via-blue-50 to-white">
      <h2 className="text-4xl font-bold mb-8 text-gray-800">Let’s Breathe Together</h2>

      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 bg-blue-300 rounded-full animate-breath shadow-xl" />
      </div>

      <p className="mb-6 text-3xl font-medium text-blue-700">
        {phase}... {countdown > 0 && <span className="font-bold">{countdown}</span>}
      </p>

      <audio ref={audioRef} src="/breathing.mp3" loop />

      {!isCompleted && (
        <button
          onClick={next}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all shadow-md"
        >
          Skip to Next
        </button>
      )}
    </div>
  );
};

export default Step1_Breathing;
