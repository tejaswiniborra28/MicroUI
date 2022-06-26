import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CounterComponent from "./components/CounterComponent";
import Counter1Component from "./components/Counter1Component";
import { CustomWindow } from "./types.window";
declare let window: CustomWindow;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CounterComponent />} />
        <Route path="home" element={<Counter1Component />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
