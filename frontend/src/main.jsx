import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import FlowPage from "./pages/FlowPage";
import PanicFlow from "./flows/Panic/PanicFlow"; 
import SadFlow from "./flows/Sad/SadFlow";
import NumbFlow from "./flows/Numb/NumbFlow";
import OverthinkFlow from "./flows/Overthinking/OverthinkFlow";
import Journal from "./pages/Journal";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyJournal from "./pages/MyJournal";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/flow/:emotion" element={<FlowPage /> } />
      <Route path="/flow/panic" element={<PanicFlow />} />
      <Route path="/flow/sad" element={<SadFlow />} />
      <Route path="/flow/numb" element={<NumbFlow />} />
      <Route path="/flow/overthinking" element={<OverthinkFlow />} />
      <Route path="/journal" element={<Journal />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/my-journal" element={<MyJournal />} />
    </Routes>
  </BrowserRouter>
);
