import React from "react";
import { useParams } from "react-router-dom";
import PanicFlow from "../flows/Panic/PanicFlow";
import SadFlow from "../flows/Sad/SadFlow";
import NumbFlow from "../flows/Numb/NumbFlow";

const FlowPage = () => {
  const { emotion } = useParams();

  switch (emotion.toLowerCase()) {
    case "panic":
      return <PanicFlow />;
    case "sad":
      return <SadFlow />;
    case "numb":
      return <NumbFlow />;
    case "angry":
      return <AngerFlow />;
    default:
      return <div className="text-center mt-10 text-xl">No flow defined for this emotion.</div>;
  }
};

export default FlowPage;


