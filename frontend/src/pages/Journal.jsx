import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaFeatherAlt, FaSpinner, FaCheckCircle } from "react-icons/fa";

const getWordCount = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
};

const Journal = () => {
  const [entry, setEntry] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const wordCount = getWordCount(entry);
  const WORD_LIMIT = 5000;

  const handleTextChange = (e) => {
    const newText = e.target.value;
    const newWordCount = getWordCount(newText);
    
    if (newWordCount <= WORD_LIMIT) {
      setEntry(newText);
    }
  };

  const handleSubmit = async () => {
    if (entry.trim() === "" || loading) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to save journal entries");
        navigate("/login");
        return;
      }

      const response = await axios.post(
        "https://safeloop-o0pc.onrender.com/api/journal/save",
        { entry },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
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
        navigate('/login');
      } else {
        alert(err.response?.data?.message || "Failed to save entry. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen relative flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <img
            src="/bg journal.gif" 
            alt="background"
            className="w-full h-full object-fill "
          />
          <div className="absolute inset-0 "></div>
        </div>

        <div className="relative z-10 bg-white/80 backdrop-blur-sm shadow-2xl shadow-green-200/50 rounded-3xl p-8 sm:p-12 w-full max-w-4xl transition-all duration-300">
          <div className="flex items-center justify-center gap-4 mb-8">
            <FaFeatherAlt className="text-6xl text-green-600" />
            <h1 className="text-5xl sm:text-2xl font-bold text-gray-800 text-center">
              Your Private Journal
            </h1>
          </div>
        
        <p className="text-gray-600 mb-10 text-center text-xl ">
          Space for your thoughts. Let it all out, this is just for you. No one can read this 💚
        </p>

        <div className="relative">
          <textarea
            rows={10}
            className="w-full p-6 bg-white border-2 border-green-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-green-500/30 transition-shadow duration-300 text-gray-700 leading-relaxed text-base"
            placeholder="What's on your mind today?"
            value={entry}
            onChange={handleTextChange}
            disabled={loading}
          />
          <div className="mt-2 flex justify-between items-center text-sm">
            <span className={`${wordCount >= WORD_LIMIT ? 'text-red-600' : 'text-gray-600'}`}>
              {wordCount} / {WORD_LIMIT} words
            </span>
            {wordCount >= WORD_LIMIT && (
              <span className="text-red-600">
                Word limit reached
              </span>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6">
         <button
            onClick={handleSubmit}
            disabled={loading || entry.trim() === "" || wordCount > WORD_LIMIT}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-500/50 transition-all duration-300 text-xl font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {loading ? (
              <>
                <FaSpinner className="animate-spin" />
                <span>Saving...</span>
              </>
            ) : (
              "Save Entry"
            )}
          </button>
          
          <Link 
            to="/my-journal" 
            className="text-green-700 hover:text-green-900 font-medium hover:underline transition-colors text-lg"
          >
            View All Entries
          </Link>
        </div>

        {submitted && (
          <div className="mt-8 flex items-center justify-center gap-2 text-green-700 font-medium text-center animate-pulse">
            <FaCheckCircle />
            <span>Entry saved successfully. You're doing great.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Journal;