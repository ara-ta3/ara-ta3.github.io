import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Schedules from "./pages/Schedules";
import CatCalorie from "./pages/CatCalorie.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/cat/calorie" element={<CatCalorie />} />
      </Routes>
    </Router>
  );
};

export default App;
