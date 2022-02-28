import React from "react";
import Login from "./components/Login";
import Book from "./components/Book";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/book" element={<Book />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
