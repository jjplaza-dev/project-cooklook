import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Global Components
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

// Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import ResultsPage from "./Pages/ResultPage";
import RecipePage from "./Pages/RecipePage";
import FavoritesPage from "./Pages/FavoritesPage";
import Privacy from "./Pages/Privacy";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;