import { useEffect, useState } from "react";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    // Hent fra localStorage, default false
    return localStorage.getItem("darkMode") === "true";
  });

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode((prev) => !prev)}
      style={{
        padding: "8px 14px",
        borderRadius: "6px",
        border: "none",
        cursor: "pointer",
        backgroundColor: darkMode ? "#bb86fc" : "#61dafb",
        color: darkMode ? "#121212" : "#fff",
        fontWeight: "bold",
      }}
    >
      {darkMode ? "☀️ Lys modus" : "🌙 Mørk modus"}
    </button>
  );
}
