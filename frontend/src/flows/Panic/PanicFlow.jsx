import { useState } from "react";
import Step1_Breathing from "./Step1_Breathing";
import Step2_Grounding from "./Step2_Grounding";
import Step3_DrinkWater from "./Step3_Drinkwater";
import Step4_Final from "./Step4_Final";

const PanicFlow = () => {
  const [step, setStep] = useState(1);

  const goToNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <>
      {step === 1 && <Step1_Breathing next={goToNext} />}
      {step === 2 && <Step2_Grounding next={goToNext} />}
      {step === 3 && <Step3_DrinkWater next={goToNext} />}
      {step === 4 && <Step4_Final />}
    </>
  );
};

export default PanicFlow;


