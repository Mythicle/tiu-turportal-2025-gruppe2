import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.js";
import Home from "./pages/Home.js";
import About from "./pages/About.js";
import FAQ from "./pages/FAQ.js";
import Kontaktoss from "./pages/Kontaktoss.js";
import Kart from "./pages/Kart.js";
import Admin from "./pages/Admin.js";
import Advertiser from "./pages/Advertiser.js";
import Login from "./pages/Login.js";

function App() {
  // Hent lagret login-status fra localStorage ved oppstart
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [role, setRole] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);

    // Lagre i localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);

    // Fjern fra localStorage
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} role={role} handleLogout={handleLogout} />
      <div style={{ padding: "20px", marginTop: "60px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/kontaktoss" element={<Kontaktoss />} />
          <Route path="/kart" element={<Kart />} />

          {/* Beskyttet admin-side */}
          <Route
            path="/admin"
            element={isLoggedIn && role === "admin" ? <Admin /> : <Navigate to="/" />}
          />

          {/* Beskyttet advertiser-side */}
          <Route
            path="/advertiser"
            element={isLoggedIn && role === "advertiser" ? 
            (<Advertiser />) : (<Navigate to="/" />)}
          />

          {/* Login */}
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;