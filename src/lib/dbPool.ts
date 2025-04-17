import mysql from "mysql2/promise";

// Global variable to store the connection pool
let globalPool = null;

// Connection pool configuration
const dbConfig = {
  host: "91.107.210.97",
  user: "root",
  password: "your_secure_password", // Update if needed
  database: "asterisk",
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
};

// Function to initialize the pool
export const initPool = async () => {
  try {
    if (!globalPool) {
      console.log("Creating new database connection pool...");
      globalPool = mysql.createPool(dbConfig);

      // Verify connection works
      const connection = await globalPool.getConnection();
      console.log("✅ Database connection pool initialized successfully");
      connection.release();
    }
    return globalPool;
  } catch (error) {
    console.error("❌ Failed to initialize database pool:", error);
    throw error;
  }
};

// Get the existing pool or create a new one
export const getPool = async () => {
  if (!globalPool) {
    return await initPool();
  }
  return globalPool;
};

// For direct imports
export default getPool;
