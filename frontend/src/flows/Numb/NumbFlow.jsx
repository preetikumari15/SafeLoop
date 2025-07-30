import React, { useState } from "react";
import Step1_Sense from "./Step1_Sense";
import Step2_NoticeBreath from "./Step2_NoticeBreath";
import Step3_Music from "./Step3_Music";
import Step4_WriteOrTalk from "./Step4_WriteorTalk";


const NumbFlow = () => {
  const [step, setStep] = useState(0);

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => Math.max(prev - 1, 0));

  return (
      <>
        {step === 0 && <Step1_Sense onNext={nextStep} />}
        {step === 1 && <Step2_NoticeBreath onNext={nextStep} onBack={prevStep} />}
        {step === 2 && <Step3_Music onNext={nextStep} onBack={prevStep} />}
        {step === 3 && <Step4_WriteOrTalk />}
      </>
  );
};

export default NumbFlow;
