import React from "react";
import { useNavigate } from "react-router-dom";

const Step4_WriteOrTalk = () => {
  const navigate = useNavigate();

  const handleWrite = () => {
    navigate("/journal");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
      <h1 className="text-6xl md:text-5xl font-semibold text-gray-800 mb-10">
        You can do this!
      </h1>
      <p className="text-gray-900 text-2xl max-w-xl leading-relaxed">
        It’s okay to feel what you’re feeling, and you don’t have to hide it or explain it away.
        <br /><br />
        You’ve made it through hard days before, and you will again but for now, just take one breath, one moment at a time. I’m here. No pressure to talk, but if you want to, I’m listening. Always. 🌿
      </p>

      <div className="mt-10 flex gap-6 flex-col sm:flex-row">
        <button
          onClick={handleWrite}
          className="bg-[#4852db] hover:bg-[#745899] transition px-8 py-4 rounded-full text-white font-medium shadow-md"
        >
          ✍️ Write
        </button>
        <a
          href="https://wa.me/9990737980"
          className="bg-[#f394af] hover:bg-[#e689a8] transition px-8 py-4 rounded-full text-white font-medium shadow-md"
        >
          📞 Talk to someone
        </a>
      </div>
    </div>
  );
};

export default Step4_WriteOrTalk;
