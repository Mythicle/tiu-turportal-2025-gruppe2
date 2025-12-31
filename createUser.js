// DETTE ER EN TESTFIL, SKAL IKKE BRUKES TIL NOE ANNET

// Kjør denne filen for å lage en bruker i databasen
// Bruk denne kommandoen i terminalen, men husk å sjekke bruker og passord først:
// node createUser.js
import bcrypt from "bcrypt";
import pool from "./src/backend/db.js";

async function run() {
  try {
    console.log("Starter opprettelse av bruker...");

    const username = "test_admin";
    const password = "test";
    const role = "admin";

    const hash = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?)",
      [username, hash, role]
    );

    console.log("Bruker opprettet med id:", result.insertId);
  } catch (err) {
    console.error("Feil:", err);
  } finally {
    await pool.end();
    process.exit(0);
  }
}

run();