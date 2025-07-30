import React from "react";
import { useState } from "react"; 

const SadFlow = () => {
  const [showPlaylist, setShowPlaylist] = useState(false);

  const handleWriteClick = () => {
    window.location.href = "/journal"; 
  };

  const togglePlaylist = () => {
    setShowPlaylist(!showPlaylist);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
    
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-10">Hey,</h1>
        <p className="text-gray-700 leading-relaxed text-base md:text-2xl max-w-2xl">
          I just wanted to remind you that you don’t have to go through this alone.
          It’s okay to feel what you’re feeling, and you don’t have to hide it or explain it away. <br /><br />
          You’ve made it through hard days before, and you will again, but for now, just take one breath, one moment at a time.
          I’m here. No pressure to talk, but if you want to, I’m listening. Always. 🌿
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <button onClick={handleWriteClick} className="px-8 py-4 text-base rounded-full bg-blue-500 hover:bg-blue-600 text-white">
            ✍️ Want to write it out?
            </button>
          <button onClick={togglePlaylist} className="px-8 py-4 text-base rounded-full bg-purple-500 hover:bg-purple-600 text-white border border-purple-700">
            🎵 {showPlaylist ? "Hide Playlist" : "Listen to music"}
            </button>
        </div>

         {showPlaylist && (
          <div className="mt-8 space-y-4">
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src="https://www.youtube.com/embed/ON5AAcbiW2M"
                title="Calm Piano Music"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
            <div className="aspect-video">
              <iframe
                className="w-full h-full rounded-lg"
                src=" https://www.youtube.com/embed/E5pPOdHXm48"
                title="Peaceful Nature Sounds"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      
    </div>
  );
};

export default SadFlow;
