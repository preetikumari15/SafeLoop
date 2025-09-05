import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyJournal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedEntry, setExpandedEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to view your journal entries");
        setLoading(false);
        return;
      }

      const response = await axios.get("https://safeloop-o0pc.onrender.com/api/journal/entries", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEntries(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching entries:", err);
      setError(err.response?.data?.message || "Failed to load entries");
      setLoading(false);
    }
  };

  const getPreviewText = (text) => {
    const firstLine = text.split('\n')[0];
    return firstLine.length > 100 ? firstLine.substring(0, 100) + '...' : firstLine;
  };

  const toggleEntry = (entryId) => {
    setExpandedEntry(expandedEntry === entryId ? null : entryId);
  };

  if (loading) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-green-700">Loading your journal entries...</div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="text-red-600">{error}</div>
    </div>
  );

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Date not available';
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Date not available';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 to-indigo-300 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-semibold text-black mb-10 text-center">
          📚 Your Journal Entries
        </h1>
        <div className="flex justify-center mb-8">
          <Link 
            to="/journal"
            className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600
              transition-colors duration-300 flex items-center gap-2 text-lg font-medium
              shadow-lg hover:shadow-xl"
          >
            ✏️ Write New Entry
          </Link>
        </div>
        {entries.length === 0 ? (
          <div className="text-center text-gray-600">
            No journal entries yet. Start writing to see them here!
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <div 
                key={entry._id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                onClick={() => toggleEntry(entry._id)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {expandedEntry === entry._id ? entry.entry : getPreviewText(entry.entry)}
                    </p>
                  </div>
                  <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
                    <span>{formatDate(entry.createdAt)}</span>
                    <span className="text-blue-500">
                      {expandedEntry === entry._id ? '▼ Show less' : '▶ Read more'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyJournal;
