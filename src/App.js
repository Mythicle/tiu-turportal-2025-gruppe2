import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Kontaktoss from "./pages/Kontaktoss";
import Kart from "./pages/Kart";

function App() {
  return (
    <Router>
      <Navbar />
       <div style={{ padding: "20px" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/kontaktoss" element={<Kontaktoss />} />
        <Route path="/Kart" element={<Kart />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;