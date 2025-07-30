import React, { useState } from "react";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (entry.trim() === "") return;
    setSubmitted(true);
    setTimeout(() => {
      setEntry("");
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-20">
      <div className="bg-white shadow-lg rounded-2xl p-15 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-green-700 mb-10 text-center">📝 Your Safe Journal</h1>
        <p className="text-gray-600 mb-15 text-center text-lg">
          This is your space. Write anything on your mind. Only you can read this.<br/> No judgment, just release. 💚
        </p>
        <textarea
          rows={8}
          className="w-full p-8 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-10"
          placeholder="Start writing here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>
        <button
          onClick={handleSubmit}
          className="mt-4 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition"
        >
          Save Entry
        </button>

        {submitted && (
          <div className="mt-4 text-green-700 font-medium text-center">
            ✅ Entry saved. You’re doing great.
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;
