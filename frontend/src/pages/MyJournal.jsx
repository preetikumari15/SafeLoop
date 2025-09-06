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
        <div className="min-h-screen bg-gradient-to-br from-red-300 to-indigo-300 px-2 sm:px-4 py-8 sm:py-20 w-full">
          <div className="max-w-5xl mx-auto w-full">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black mb-6 sm:mb-10 text-center px-2">
              📚 Your Journal Entries
            </h1>
            
            <div className="flex justify-center mb-6 sm:mb-8 px-2">
              <Link 
                to="/journal"
                className="w-full sm:w-auto bg-green-500 text-white px-4 sm:px-8 py-3 sm:py-4 
                  rounded-xl hover:bg-green-600 transition-colors duration-300 
                  flex items-center justify-center gap-2 text-base sm:text-lg font-medium
                  shadow-lg hover:shadow-xl"
              >
                ✏️ Write New Entry
              </Link>
            </div>

            {entries.length === 0 ? (
              <div className="text-center text-gray-600 text-sm sm:text-base px-2">
                No journal entries yet. Start writing to see them here!
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 px-2">
                {entries.map((entry) => (
                  <div 
                    key={entry._id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer 
                      transition-all duration-300 hover:shadow-xl hover:scale-[1.01] w-full"
                    onClick={() => toggleEntry(entry._id)}
                  >
                    <div className="p-3 sm:p-6">
                      <div className="flex justify-between items-start w-full">
                        <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap break-words w-full">
                          {expandedEntry === entry._id ? entry.entry : getPreviewText(entry.entry)}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500 
                        flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 w-full"
                      >
                        <span className="text-gray-500 break-words">{formatDate(entry.createdAt)}</span>
                        <span className="text-blue-500 inline-flex items-center">
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
