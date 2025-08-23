import React, { useState } from "react";
import Step1_Sense from "./Step1_Sense";
import Step2_Create from "./Step2_Create";
import Step3_Quiz from "./Step3_Quiz";
import Step4_WriteOrTalk from "./Step4_WriteOrTalk";


const NumbFlow = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
      <>
        {step === 0 && <Step1_Sense onNext={nextStep} />}
        {step === 1 && <Step2_Create onNext={nextStep} onBack={prevStep} />}
        {step === 2 && <Step3_Quiz onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <Step4_WriteOrTalk />}
      </>
  );
};

export default NumbFlow;
