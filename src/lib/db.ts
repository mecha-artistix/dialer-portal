import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "127.0.0.1", // Use the actual IP instead of localhost
  user: "root",
  password: "", // Update if needed
  database: "asterisk",
  port: 3306,
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
