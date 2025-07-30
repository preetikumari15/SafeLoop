import React, { useEffect, useRef } from "react";

const Step2_NoticeBreath = ({ onNext }) => {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
      <h2 className="text-5xl font-semibold text-gray-800 mb-10">
        Your breath is here 🌬️
      </h2>
      <p className="text-gray-700 text-2xl max-w-2xl mb-8">
        You don’t need to control anything. <br />
        Just feel the air move in... and out. <br />
        Let each breath be a quiet reminder, you’re still here.
      </p>
      <div className="text-xl text-rose-600">You're doing enough.</div>
      <button
        onClick={onNext}
        className="mt-4 px-8 py-4 bg-[#5193f0] text-white rounded-full font-medium hover:bg-[#3c506e] transition duration-300 shadow-md"
      >
        Next
      </button>
    </div>
  );
};

export default Step2_NoticeBreath;
