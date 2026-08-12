import React from "react";
import  ImageRipple  from "@/components/ui/image-ripple";

export default function Step2_Create({ onNext }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with ripple effect */}
      <div className="absolute inset-0">
        <ImageRipple
          imageUrl="/pict.avif"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col min-h-screen justify-center items-center p-4 text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 text-shadow-lg animate-fade-in-up"
        >
          Create the Magic 🪄
        </h2>

        <p
          className="
            text-base sm:text-lg md:text-2xl lg:text-3xl 
            text-slate-200 mb-6 sm:mb-8 leading-relaxed 
            max-w-lg sm:max-w-2xl md:max-w-3xl 
            text-shadow animate-fade-in-up
          "
        >
          Move Freely.
          <br />
          Create an echo that ripples through the mountains.
        </p>

        <button
          onClick={onNext}
          className="
            px-6 py-2 sm:px-8 sm:py-3 
            bg-green-500/50 backdrop-blur-sm rounded-xl
            border border-white/20 text-white 
            hover:bg-green-600/60 transition-all duration-300 
            text-base sm:text-lg md:text-xl font-medium
            hover:scale-105 focus:outline-none focus:ring-2 
            focus:ring-white/50 shadow-lg
          "
        >
          Continue ✨
        </button>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
        }
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.6);
        }
        .text-shadow-lg {
          text-shadow: 0 4px 15px rgba(0,0,0,0.7);
        }
      `}</style>
    </div>
  );
}