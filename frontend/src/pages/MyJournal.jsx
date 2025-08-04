import React, { useState, useEffect } from "react";
import axios from "axios";

const MyJournal = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

      const response = await axios.get("http://localhost:4000/api/journal/entries", {
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
    <div className="min-h-screen bg-green-50 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-semibold text-green-700 mb-10 text-center">
          📚 Your Journal Entries
        </h1>
        
        {entries.length === 0 ? (
          <div className="text-center text-gray-600">
            No journal entries yet. Start writing to see them here!
          </div>
        ) : (
          <div className="space-y-6">
            {entries.map((entry) => (
              <div 
                key={entry._id} 
                className="bg-white p-6 rounded-lg shadow-md"
              >
              <p className="text-gray-700 whitespace-pre-wrap">{entry.entry}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {formatDate(entry.createdAt)}
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
