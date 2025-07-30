import React from "react";

const Step1_Sense = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-200 flex flex-col justify-center items-center p-4 text-center space-y-4">
      <h2 className="text-4xl font-semibold text-gray-800 mb-10">
        Hey! you're here and that matters.
      </h2>
      <p className="text-gray-700 text-2xl mb-6 leading-relaxed max-w-xl">
        It’s okay if you’re not feeling much right now.
        <br />Sometimes the world can feel distant like you're behind a wall of glass.
        <br />
        Just know, even in numbness, you’re not alone. Let's gently begin.
      </p>

      <button
        onClick={onNext}
        className="mt-4 px-6 py-3 bg-[#4b85d6] text-white rounded-full font-medium hover:bg-[#3f4e77] transition duration-300 shadow-md"
      >
        Next
      </button>
    </div>
  );
};

export default Step1_Sense;
