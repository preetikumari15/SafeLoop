import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FloatingSparkles = ({ count = 30 }) => {
  return [...Array(count)].map((_, i) => (
    <div
      key={i}
      className="absolute text-yellow-500/20 animate-sparkle"
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

const Game = ({ onComplete }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [renamedItems, setRenamedItems] = useState(["", "", "", "", ""]);
  const [memories, setMemories] = useState(["", "", ""]);
  const [countingDone, setCountingDone] = useState(false);
  const [touchDescription, setTouchDescription] = useState("");

  const handleRenameChange = (value, index) => {
    const newItems = [...renamedItems];
    newItems[index] = value;
    setRenamedItems(newItems);
  };

  const handleMemoryChange = (value, index) => {
    const newMemories = [...memories];
    newMemories[index] = value;
    setMemories(newMemories);
  };

    const doCountGame = () => {
    let output = [];
    for (let i = 20; i >= 1; i--) {
      let line = i % 2 === 0 ? `🤫 Whisper: ${i}` : `🔊 Loud: ${i}`;
      if (i % 3 === 0) line += " 👏 Clap!";
      output.push(line);
    }
    alert(output.join("\n"));
    setCountingDone(true);
  };

  const nextStep = () => setStep(step + 1);

   return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased overflow-hidden">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/50 via-slate-600 to-orange-500/50" />
        <FloatingSparkles />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-12 max-w-3xl w-full">
          {step === 1 && (
            <div className="space-y-6 text-center animate-fadeIn">
              <h2 className="text-6xl font-bold text-white text-shadow-lg">🎮 Rename Game</h2>
              <p className="text-2xl text-slate-300 text-shadow">Look around you. Rename 5 objects in a funny/wrong way.</p>
              {renamedItems.map((item, index) => (
                <input
                  key={index}
                  type="text"
                  placeholder={`Rename item ${index + 1}`}
                  value={item}
                  onChange={(e) => handleRenameChange(e.target.value, index)}
                  className="w-full p-4 bg-white/10 border border-white/10 rounded-xl 
                    text-white placeholder-white/70 focus:outline-none focus:border-purple-500/50
                    text-lg"
                />
              ))}
              <button
                onClick={nextStep}
                disabled={renamedItems.some(item => item.trim() === "")}
                className="w-full sm:w-auto px-10 py-4 bg-purple-900/50 backdrop-blur-sm rounded-xl
                  border border-purple-500/30 text-white hover:bg-purple-500/60 
                  transition-all duration-300 text-xl font-medium disabled:opacity-50
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Next Step ✨
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 text-center">
              <h2 className="text-6xl font-bold text-white text-shadow-lg mb-8">🧠 Memory Snap</h2>
              <p className="text-2xl text-slate-300 text-shadow mb-8">Write 1 random happy or peaceful memory.</p>
              <textarea
                placeholder="Share your memory..."
                value={memories[0]}
                onChange={(e) => setMemories([e.target.value])}
                className="w-full p-4 bg-white/10 border border-white/10 rounded-xl text-white placeholder-white/70 focus:outline-none focus:border-purple-500/50"
                rows="4"
              />
              <button
                onClick={nextStep}
                disabled={memories[0].trim() === ""}
                className="px-8 py-3 bg-purple-900/50 backdrop-blur-sm rounded-xl
                  border border-purple-500/30 text-white hover:bg-purple-500/60 
                  transition-all duration-300 text-lg font-medium disabled:opacity-50
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Next ✨
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 text-center">
              <div className="animate-fadeIn">
                <h2 className="text-6xl font-bold text-white text-shadow-lg mb-6">🎵 Count & Breathe</h2>
                <p className="text-2xl text-slate-300 text-shadow mb-8">
                  Count backwards from 20 with a twist.
                </p>
                <button
                  onClick={doCountGame}
                  className="w-full sm:w-auto px-10 py-4 bg-purple-900/50 backdrop-blur-sm rounded-xl
                    border border-purple-500/30 text-white hover:bg-purple-500/60 
                    transition-all duration-300 text-xl font-medium
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  Start Counting 🔢
                </button>
                {countingDone && (
                  <div className="mt-8 animate-fadeIn">
                    <p className="text-green-400 mb-4">Great job! 🌟</p>
                    <button
                      onClick={nextStep}
                      className="w-full sm:w-auto px-10 py-4 bg-green-900/50 backdrop-blur-sm rounded-xl
                        border border-green-500/30 text-white hover:bg-green-500/60 
                        transition-all duration-300 text-xl font-medium
                        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                    >
                      Continue ✨
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 text-center animate-fadeIn">
              <h2 className="text-6xl font-bold text-white text-shadow-lg mb-6">👆 Sensory Grounding</h2>
              <p className="text-2xl text-slate-300 text-shadow mb-6">
                Find something nearby to touch. Notice its texture, temperature, and weight.
              </p>
              <div className="bg-white/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 mb-8">
                <p className="text-purple-300 text-lg italic">
                  "Is it smooth or rough? Cold or warm? Light or heavy?"
                </p>
              </div>
              <textarea
                placeholder="Write what you notice about the object..."
                value={touchDescription}
                onChange={(e) => setTouchDescription(e.target.value)}
                className="w-full p-6 bg-white/10 border border-white/10 rounded-xl 
                  text-white placeholder-white/70 focus:outline-none focus:border-purple-500/50
                  min-h-[120px] text-lg"
              />
              <button
                onClick={nextStep}
                disabled={touchDescription.trim() === ""}
                className="w-full sm:w-auto px-10 py-4 bg-purple-900/50 backdrop-blur-sm rounded-xl
                  border border-purple-500/30 text-white hover:bg-purple-500/60 
                  transition-all duration-300 text-xl font-medium disabled:opacity-50
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Next Step ✨
              </button>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-8 text-center animate-fadeIn">
              <h2 className="text-6xl font-bold text-white text-shadow-lg mb-6">🌈 Color Search</h2>
              <p className="text-2xl text-slate-300 text-shadow mb-6">
                Look around your space. What colors catch your eye?
              </p>
              <div className="grid gap-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="relative">
                    <input
                      type="text"
                      placeholder={`Find color ${index + 1}`}
                      value={memories[index]}
                      onChange={(e) => handleMemoryChange(e.target.value, index)}
                      className="w-full p-4 bg-white/10 border border-white/10 rounded-xl 
                        text-white placeholder-white/70 focus:outline-none focus:border-purple-500/50
                        text-lg"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl">
                      {index === 0 ? '🎨' : index === 1 ? '🖌️' : '🎭'}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={nextStep}
                disabled={memories.some(memory => memory.trim() === "")}
                className="w-full sm:w-auto px-10 py-4 bg-purple-900/50 backdrop-blur-sm rounded-xl
                  border border-purple-500/30 text-white hover:bg-purple-500/60 
                  transition-all duration-300 text-xl font-medium disabled:opacity-50
                  hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
              >
                Final Step ✨
              </button>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-8 text-center animate-fadeIn">
              <h2 className="text-6xl font-bold text-white text-shadow-lg mb-6">
                You're Amazing! 🌟
              </h2>
              <p className="text-2xl text-slate-300 text-shadow mb-8">
                Look how far you've come. Your mind is calmer now.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <button
                  onClick={() => navigate('/')}
                  className="w-full sm:w-auto px-10 py-4 bg-purple-900/50 backdrop-blur-sm rounded-xl
                    border border-purple-500/30 text-white hover:bg-purple-500/60 
                    transition-all duration-300 text-xl font-medium
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                >
                  Back Home 🏠
                </button>
                <button
                  onClick={() => navigate('/journal')}
                  className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-sm rounded-xl
                    border border-white/20 text-white hover:bg-white/20 
                    transition-all duration-300 text-xl font-medium
                    hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                  Write Journal 📝
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% { transform: scale(0.8); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.4; }
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }

        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        }

        .text-shadow-lg {
          text-shadow: 0 4px 8px rgba(0,0,0,0.5);
        }

        @keyframes fadeIn {
         from { opacity: 0; transform: translateY(10px); }
         to { opacity: 1; transform: translateY(0); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Game;