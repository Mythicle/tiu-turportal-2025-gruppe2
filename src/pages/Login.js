import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Legger til roller
  const demoUsers = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "advertiser", password: "abcd", role: "advertiser" }
  ];

  const onSubmit = (e) => {
    e.preventDefault();
    const user = demoUsers.find(u => u.username === username && u.password === password);

    if (user) {
      setMessage("Innlogging vellykket!");
      handleLogin(user.role); // sender rolle tilbake til App.js
      // Redirect etter 0,7 sekund
      setTimeout(() => navigate("/"), 700);
    } else {
      setMessage("Feil brukernavn eller passord");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
      <h1>Logg inn</h1>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          type="text"
          placeholder="Brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Passord"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{
          padding: "10px", borderRadius: "6px", border: "none",
          backgroundColor: "#61dafb", color: "white", fontWeight: "bold", cursor: "pointer"
        }}>
          Logg inn
        </button>
      </form>
      {message && <p style={{ marginTop: "15px" }}>{message}</p>}
    </div>
  );
}
