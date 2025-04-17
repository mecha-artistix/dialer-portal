import pool from "@/lib/db";

export async function POST(req) {
  try {
    const [rows] = await pool.query(`
      SELECT vl.call_date AS time, vl.user, vl.lead_id, vl.phone_number,
             vl.length_in_sec as Duration, vl.campaign_id, vlist.comments, vl.status
      FROM vicidial_log vl
      JOIN vicidial_list vlist ON vl.lead_id = vlist.lead_id
      WHERE vl.status NOT IN ('AA','NA','AB','ADC','PDROP','DROP','LRERR','QUEUE')
        AND vlist.comments != ''
      LIMIT 5
    `);

    return Response.json({ message: "success", data: rows });
  } catch (error) {
    console.error("DB query failed:", error);
    return Response.json({ message: "Database error", error: error.message }, { status: 500 });
  }
}
export async function GET(req) {
  const rows = "thi is a response";
  return Response.json({ message: "success", data: rows });
}
