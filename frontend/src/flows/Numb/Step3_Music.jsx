import React from "react";

const musicPlaylist = [
  {
    title: "Safe & Grounded",
    url: "https://www.youtube.com/embed/E5pPOdHXm48?si=xvC8vrVozGkXZaUU",
  },
  {
    title: "Breathe Gently",
    url: "https://www.youtube.com/embed/ON5AAcbiW2M?si=kxQqJmnum8apWoWT",
  },
];

const Step3_Music = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
      <h2 className="text-4xl font-semibold mb-12 text-indigo-700">Let the music hold you</h2>
      <p className="text-gray-600 mb-10 max-w-md text-xl">
        Here are a few calming sounds. Listen to whichever feels right. There's no rush.
      </p>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2">
        {musicPlaylist.map((track, idx) => (
          <div key={idx} className="bg-purple-100 shadow-lg rounded-xl p-6">
            <p className="font-medium text-lg mb-4">{track.title}</p>
            <iframe
              className="rounded-lg w-full h-68"
              src={track.url}
              title={track.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="mt-8 px-8 py-4 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
      >
        Continue
      </button>
    </div>
  );
};

export default Step3_Music;
