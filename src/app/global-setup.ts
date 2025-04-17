// src/app/global-setup.js

import { initPool } from "@/lib/dbPool";

console.log("NextDialerPortal app starting up...");

// Initialize database pool at startup
initPool()
  .then(() => {
    console.log("Database pool initialized at startup");
  })
  .catch((err) => {
    console.error("Failed to initialize database pool at startup:", err);
    // Don't throw error here - let the app start anyway
  });

// Export an empty object - this is required
export const globalSetup = {};
