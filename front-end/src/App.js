import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import MovieReviews from "./components/content";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/content/:movieId" element={<MovieReviews />} />
            </Routes>
        </Router>
    );
}

export default App;
