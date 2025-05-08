import mysql from "mysql2/promise";

// Global variable to store the connection pool
let globalPool = null;

// Connection pool configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
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
