import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* can add error handling, 404 not found page... */}
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
