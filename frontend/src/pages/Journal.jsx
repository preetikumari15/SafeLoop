import React, { useState } from "react";
import axios from "axios";

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async () => {
  if (entry.trim() === "") return;

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to save journal entries");
      return;
    }

    const response = await axios.post(
      "http://localhost:4000/api/journal/save",
      { entry },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );

    if (response.status === 201) {
      setSubmitted(true);
      setTimeout(() => {
        setEntry("");
        setSubmitted(false);
      }, 3000);
    }
  } catch (err) {
    console.error("Error saving journal:", err);
    if (err.response?.status === 401) {
      localStorage.removeItem('token'); 
      alert("Your session has expired. Please log in again.");
    } else {
      alert(err.response?.data?.message || "Failed to save entry. Please try again.");
    }
  }
};

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4 py-20">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-green-700 mb-10 text-center">📝 Your Safe Journal</h1>
        <p className="text-gray-600 mb-6 text-center text-lg">
          This is your space. Write anything on your mind.<br />Only you can read this. No judgment, just release. 💚
        </p>
        <textarea
          rows={8}
          className="w-full p-6 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 mb-6"
          placeholder="Start writing here..."
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
        ></textarea>
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="mt-4 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 transition"
          >
            Save Entry
          </button>
        </div>

        {submitted && (
          <div className="mt-6 text-green-700 font-medium text-center">
            ✅ Entry saved. You’re doing great.
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;

