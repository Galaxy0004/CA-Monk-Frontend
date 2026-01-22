import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<Home />} />
      <Route path="/create" element={<CreateBlog />} />
    </Routes>
  );
}

export default App;
