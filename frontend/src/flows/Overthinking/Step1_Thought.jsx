import React from "react";

const Step1_Thought = ({onNext}) => {
    const onPlayGame = () => {
        onNext("game");
    }
    const onWrite = () => {
      window.location.href = "/journal";
    };
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
        <h1 className="text-6xl font-bold text-rose-400 mb-12">
          Hey, overthinking again?
        </h1>
        <p className="text-xl text-gray-900 mb-10">
          It's okay. Your mind is just trying to keep up. You’re not alone in this.
        </p>

        <div className="mt-4 text-xl bg-white/40 p-6 rounded-xl border border-purple-200 shadow-inner mb-8">
          <p className="italic text-red-400">
            “You don’t have to believe every thought that visits your mind.”
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <button
            onClick={onPlayGame}
            className="bg-red-400 hover:bg-pink-500 text-white px-8 py-4 rounded-full shadow-md transition"
          >
            Let’s play a game
          </button>
          <button
            onClick={onWrite}
            className="bg-white border border-purple-400 text-purple-700 px-8 py-4 rounded-full shadow-md hover:bg-purple-100 transition"
          >
            Wanna Write about it?
          </button>
        </div>
    </div>
  );
};

export default Step1_Thought;
