import React, { useState } from "react";
import Step1_Thought from "./Step1_Thought";
import Game from "./Game";

const OverthinkFlow = () => {
  const [currentStep, setCurrentStep] = useState("thought");

  const next = (step) => {
    setCurrentStep(step);
  };

  return (
    <>
      {currentStep === "thought" && <Step1_Thought onNext={next} />}
      {currentStep === "game" && <Game onComplete={() => next("thought")} />}
    </>
  );
};

export default OverthinkFlow;
