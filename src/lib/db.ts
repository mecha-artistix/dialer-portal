import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // leave blank
  database: "asterisk",
});

export default db;
