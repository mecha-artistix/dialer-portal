// import pool from "@/lib/db";
import getPool from "@/lib/dbPool";
import { NextResponse } from "next/server";

export async function POST(req) {
  let connection;
  let pool;

  try {
    // Get the pool
    pool = await getPool();

    // Get a connection from the pool
    connection = await pool.getConnection();

    // Execute query
    const [rows] = await connection.query(`
      SELECT
        vl.call_date AS time,
        vl.user,
        vl.lead_id,
        vl.phone_number,
        vl.length_in_sec as Duration,
        vl.campaign_id,
        vlist.comments,
        vl.status
      FROM
        vicidial_log_archive vl  
      JOIN
        vicidial_list vlist ON vl.lead_id = vlist.lead_id
      WHERE
        vl.status NOT IN ('AA','NA','AB','ADC','PDROP','DROP','LRERR','QUEUE')
        AND vlist.comments != ''
      LIMIT 5
    `);

    return NextResponse.json({ message: "success", data: rows });
  } catch (error) {
    console.error("DB query failed:", error);
    return NextResponse.json({ message: "Database error", error: error.message }, { status: 500 });
  } finally {
    // Always release the connection back to the pool
    if (connection) connection.release();
  }
}

// TEST
export async function GET(req) {
  const rows = "thi is a response";
  return Response.json({ message: "success", data: rows });
}
