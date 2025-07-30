import React, { useState } from "react";

const Game = ({ onComplete }) => {
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 px-8 py-12">
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl p-12 max-w-xl w-full text-center space-y-6">
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">🎮 Rename Game</h2>
          <p className="mb-4">Look around you. Rename 5 objects in a funny/wrong way.</p>
          {renamedItems.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Rename item ${index + 1}`}
              value={item}
              onChange={(e) => handleRenameChange(e.target.value, index)}
              className="block w-full p-2 mb-2 border rounded"
            />
          ))}
          <button
            onClick={nextStep}
            className="mt-4 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded"
            disabled={renamedItems.some(item => item.trim() === "")}
          >
            Next
          </button>
        </div>
      )}

      {step === 2 && (
            <div>
                <h2 className="text-3xl font-semibold mb-6">🧠 Memory Snap</h2>
                <p className="text-xl mb-6">Write 1 random happy or peaceful memory.</p>
                <input
                type="text"
                placeholder="Memory description"
                value={memories[0]}
                onChange={(e) => {
                    const newMemory = e.target.value;
                    setMemories([newMemory]); // single memory in array
                }}
                className="block w-full p-2 mb-4 border rounded"
                />
                <button
                onClick={nextStep}
                className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                disabled={memories[0].trim() === ""}
                >
                Next
                </button>
            </div>
        )}
      {step === 3 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6">🔢 Twist Counting</h2>
          <p className="text-xl mb-6">Count backwards from 20 with a twist.</p>
          {!countingDone ? (
            <button
              onClick={doCountGame}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
            >
              Start Count Game
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="text-3xl font-semibold mb-6">🤲 Touch & Describe</h2>
          <p className="text-xl mb-6">Touch something near you and describe how it feels.</p>
          <textarea
            placeholder="Soft? Cold? Smooth? Describe..."
            value={touchDescription}
            onChange={(e) => setTouchDescription(e.target.value)}
            className="block w-full p-3 border rounded"
            rows="3"
          />
          <button
            onClick={nextStep}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            disabled={touchDescription.trim() === ""}
          >
            Finish
          </button>
        </div>
      )}

      {step === 5 && (
        <div>
          <h2 className="text-3xl font-bold text-center mb-6">🌈 You Did It!</h2>
          <p className="text-lg text-center mt-4 text-gray-900">
            Your mind just shifted gears. You showed up for yourself today. That matters.
          </p>
          <button
            onClick={nextStep}
            className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full"
          >
            Continue
          </button>
        </div>
      )}

      {step === 6 && (
        <div>
          <h2 className="text-3xl font-bold text-green-700 mb-6">You’re back 🌿</h2>
          <p className="text-gray-700 text-lg mt-2 mb-4">
            Overthinking stopped? You’re here. It’s going to be okay.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onComplete}
              className="bg-white border border-green-400 text-green-700 px-4 py-3 rounded-full hover:bg-green-100 transition"
            >
              🔁 Back to Flow
            </button>

            <a
              href="https://wa.me/9990737980"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-green-400 text-green-700 px-4 py-3 rounded-full hover:bg-green-100 transition text-center"
            >
              📞 Talk to someone
            </a>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Game;
