import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "itfag.usn.no",
  user: "inf200v26u2",
  password: "pw2",
  database: "inf200v26db2",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;