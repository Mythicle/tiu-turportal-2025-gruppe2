import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{
      padding: "15px 30px",
      backgroundColor: "#282c34",
      color: "white",
      display: "flex",
      gap: "20px",
      alignItems: "center"
    }}>
      <Link to="/" style={{ color: "white" }}>Hjem</Link>
      <Link to="/about" style={{ color: "white" }}>About</Link>
      <Link to="/faq" style={{ color: "white" }}>FAQ</Link>
      <Link to="/kontaktoss" style={{ color: "white" }}>Kontakt oss</Link>
      <Link to="/kart" style={{ color: "white" }}>Kart</Link>
    </nav>
  );
}
