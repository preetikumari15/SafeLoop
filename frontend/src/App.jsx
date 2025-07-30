import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const navigate = useNavigate();
  const emotions = [
    { emoji: "😰", label: "Panic", route: "/flow/panic" },
    { emoji: "😢", label: "Sad", route: "/flow/sad" },
    { emoji: "😶", label: "Numb", route: "/flow/numb" },
    { emoji: "💭", label: "Overthinking", route: "/flow/overthinking" },
  ];

  return (
    <div>
      <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-100 to-blue-50">
      <h1 className="text-6xl font-bold mb-8">Hey! What happened?</h1>
      <h2 className="text-3xl font-bold mb-10">Tell me, How are you feeling?</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-8">
        {emotions.map((emotion, index) => (
          <button
            key={index}
            onClick={() => navigate(emotion.route)}
            className="p-12 bg-white rounded-lg shadow hover:scale-105 transition text-xl border border-pink-200 hover:bg-pink-50"
          >
            {emotion.emoji} {emotion.label}
          </button>
        ))}
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default App;
