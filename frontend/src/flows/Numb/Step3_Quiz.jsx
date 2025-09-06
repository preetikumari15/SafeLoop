import React, { useState, useMemo } from 'react';

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
  <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-purple-900">
    <Sparkles count={50} />
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
      <div
        className="absolute -bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-teal-500/30 rounded-full"
        style={{ animation: 'float 22s ease-in-out infinite', animationDelay: '10s' }}
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


const quizData = [
    {
        question: "If your mood were a planet, which one would it be today?🔮",
        options: ["A cozy, undiscovered planet made of blankets", "Jupiter, because I'm feeling extra large and gassy", "A sparkly one with rings made of donuts", "Pluto, feeling a bit small and far away, but still a star"],
    },
    {
        question: "What is the official snack of a productive afternoon nap?🍟",
        options: ["A single, perfect raspberry", "A cloud that tastes like cotton candy", "The concept of leftover pizza", "Three slightly confused almonds"],
    },
    {
        question: "You're given a magical remote. Which button do you press?🪄",
        options: ["'Add Subtitles to Real Life'", "'Mute Inner Critic'", "'Instantly Find Lost Socks'", "'Summon a Golden Retriever'"],
    },
];

const quizResults = [
    "You are a Cosmic Dreamer, finding magic in the quiet moments. Your spirit animal is a cat napping in a sunbeam.🎇",
    "You are a Playful Inventor, full of wit and wonderful ideas. Your spirit animal is a clever otter who can juggle.🦦",
    "You are a Comfort Seeker, creating warmth wherever you go. Your spirit animal is a fluffy capybara chilling in a hot spring.🌸"
];


export default function Step3_Quiz({ onNext }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState("");

  const handleAnswer = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setResult(quizResults[Math.floor(Math.random() * quizResults.length)]);
      setShowResult(true);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 font-sans antialiased">
      <DreamyBackground />
      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center p-4 text-center">
        {!showResult ? (
          <div className="w-full max-w-4xl animate-fade-in-up">
            <h2 className="text-4xl md:text-7xl font-semibold text-white mb-12 text-shadow-lg">
              A Quick Cosmic Quiz 🌠
            </h2>
            <p className="text-slate-300 text-2xl md:text-3xl mb-10 leading-relaxed text-shadow">
              {quizData[currentQuestion].question}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
              {quizData[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={handleAnswer}
                  className="px-5 py-5 bg-white/10 backdrop-blur-sm rounded-xl
                           border border-white/20 text-white hover:bg-white/60
                           transition-all duration-300 text-xl
                           hover:scale-105 focus:outline-none focus:ring-2
                           focus:ring-white/50"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 text-shadow-lg">
              Your Cosmic Profile✨:
            </h2>
            <p className="text-slate-300 text-2xl md:text-3xl mb-12 leading-relaxed max-w-3xl text-shadow">
              {result}
            </p>
            <button
              onClick={onNext}
              className="px-8 py-3 bg-green-500/20 backdrop-blur-sm rounded-xl
                       border border-white/20 text-white hover:bg-green-600/50
                       transition-all duration-300 text-xl font-medium
                       hover:scale-105 focus:outline-none focus:ring-2
                       focus:ring-white/50"
            >
              Wow, so true ✨
            </button>
          </div>
        )}
      </div>
    </div>
  );
}