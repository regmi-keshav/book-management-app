import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddBook from "./components/AddBook";
import UpdateBook from "./components/UpdateBook";
import HomePage from "./components/HomePage";
function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
