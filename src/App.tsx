import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { Login } from "./pages/login";
import { Navbar } from "./components/navbar";
import { CreatePost } from "./pages/create-post/create-post";
import { Profile } from "./pages/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/profile/:userId" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
