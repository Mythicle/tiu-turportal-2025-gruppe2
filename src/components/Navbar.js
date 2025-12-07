import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar({ isLoggedIn, role, handleLogout }) {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const linkStyle = { 
    color: "white", 
    lineHeight: "1",
    fontSize: "16px",
    textDecoration: "none",
    cursor: "pointer",
    padding: "6px 0"
  };

  const handleLinkClick = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  return (
    <>
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: darkMode ? "#1f1f1fa2" : "#1a4bac9f",
        padding: "0 20px",
        height: "60px",
        boxSizing: "border-box",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
        {/* Venstre: Logo + linker */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/" style={{ ...linkStyle, fontWeight: "bold" }}>NavnPåNettside</Link>
          {!isMobile && (
            <>
              <span onClick={() => handleLinkClick("/")} style={linkStyle}>Hjem</span>
              <span onClick={() => handleLinkClick("/about")} style={linkStyle}>About</span>
              <span onClick={() => handleLinkClick("/faq")} style={linkStyle}>FAQ</span>
              <span onClick={() => handleLinkClick("/kontaktoss")} style={linkStyle}>Kontakt oss</span>
              <span onClick={() => handleLinkClick("/kart")} style={linkStyle}>Kart</span>
              {isLoggedIn && role === "admin" && (<span onClick={() => handleLinkClick("/admin")} style={linkStyle}>Admin</span>)}
              {isLoggedIn && role === "advertiser" && (<span onClick={() => handleLinkClick("/advertiser")} style={linkStyle}>Advertiser</span>)}

            </>
          )}
        </div>

        {/* Høyre: Dark mode + Logg inn / Admin / Advertiser + Logg ut */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              onClick={() => setDarkMode(prev => !prev)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                backgroundColor: darkMode ? "#bb86fc" : "#61dafb",
                color: darkMode ? "#121212" : "#fff",
                fontWeight: "bold",
                fontSize: "14px"
              }}
            >
              {darkMode ? "Lys modus" : "Mørk modus"}
            </button>

            {/* Logg inn vises alltid etter Dark Mode */}
            {!isLoggedIn && (
              <span onClick={() => handleLinkClick("/login")} style={linkStyle}>Logg inn</span>
            )}

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "bold",
                  backgroundColor: "#bb86fc",
                  color: "#121212",
                  fontSize: "14px"
                }}
              >
                Logg ut
              </button>
            )}
          </div>
        )}

        {/* Hamburger på mobil */}
        {isMobile && (
          <div
            onClick={() => setMenuOpen(prev => !prev)}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              width: "25px",
              height: "20px",
              cursor: "pointer",
            }}
          >
            <span style={{ height: "3px", background: "white", borderRadius: "2px" }} />
            <span style={{ height: "3px", background: "white", borderRadius: "2px" }} />
            <span style={{ height: "3px", background: "white", borderRadius: "2px" }} />
          </div>
        )}
      </nav>

      {/* Mobil-meny med slide-in/out */}
      <div
        style={{
          position: "fixed",
          top: 60,
          left: 0,
          right: 0,
          backgroundColor: darkMode ? "#1f1f1f" : "#1a4aacff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: menuOpen ? "15px 0" : "0",
          maxHeight: menuOpen ? "500px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease, padding 0.3s ease",
          zIndex: 999
        }}
      >
        {menuOpen && (
          <>
            <span onClick={() => handleLinkClick("/")} style={linkStyle}>Hjem</span>
            <span onClick={() => handleLinkClick("/about")} style={linkStyle}>About</span>
            <span onClick={() => handleLinkClick("/faq")} style={linkStyle}>FAQ</span>
            <span onClick={() => handleLinkClick("/kontaktoss")} style={linkStyle}>Kontakt oss</span>
            <span onClick={() => handleLinkClick("/kart")} style={linkStyle}>Kart</span>
            {!isLoggedIn && <span onClick={() => handleLinkClick("/login")} style={linkStyle}>Logg inn</span>}
            {isLoggedIn && role === "admin" && <span onClick={() => handleLinkClick("/admin")} style={linkStyle}>Admin</span>}
            {isLoggedIn && role === "advertiser" && <span onClick={() => handleLinkClick("/advertiser")} style={linkStyle}>Advertiser</span>}

            {/* Dark mode og logg ut inne i hamburger */}
            <button
              onClick={() => setDarkMode(prev => !prev)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
                marginTop: "10px",
                backgroundColor: darkMode ? "#bb86fc" : "#61dafb",
                color: darkMode ? "#121212" : "#fff",
                fontWeight: "bold"
              }}
            >
              {darkMode ? "Lys modus" : "Mørk modus"}
            </button>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "bold",
                  backgroundColor: "#bb86fc",
                  color: "#121212",
                }}
              >
                Logg ut
              </button>
            )}
          </>
        )}
      </div>

      {/* Spacer for navbar */}
      <div style={{ height: 60 }} />
    </>
  );
}
