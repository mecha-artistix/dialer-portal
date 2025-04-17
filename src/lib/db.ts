import mysql from "mysql2/promise";

const pool = mysql.createPool({
  // Instead of host and port, use socketPath for direct socket connection
  socketPath: "/run/mysql/mysql.sock",
  user: "root",
  password: "", // Update this if you have a password set
  database: "asterisk",
  waitForConnections: true,
  connectionLimit: 10,
});

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully via socket");
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default pool;
