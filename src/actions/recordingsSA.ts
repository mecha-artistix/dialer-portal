"use server";
// const url =
//   "http://91.107.210.97/vicidial/non_agent_api_V2.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=DAR3UI49T5MV2&agent_user=9001&date=2025-04-18&duration=Y&header=YES";
import { ViciFilterParamsType } from "@/utils/schemas";

function parseVicidialResponse(text: string) {
  const lines = text.trim().split("\n").slice(1);

  const metaLine = lines[lines.length - 1];
  let meta = {};
  let dataLines = lines;
  // Check if the last line is JSON
  if (metaLine.startsWith("{") && metaLine.endsWith("}")) {
    meta = JSON.parse(metaLine);
    dataLines = lines.slice(1, -1); // skip header and meta
  } else {
    dataLines = lines.slice(1); // only skip header
  }

  const data = dataLines.map((line) => {
    const parts = line.split("|");
    return {
      start_time: parts[0],
      user: parts[1],
      recording_id: parts[2],
      lead_id: parts[3],
      length_in_sec: parts[4],
      location: parts[5],
      status: parts[6],
      phone_number: parts[7],
    };
  });

  return { data, meta };
}

export const getRecordingsSA = async (viciFilterParams: ViciFilterParamsType) => {
  const { date, agent_user, lead_id, phone_number } = viciFilterParams;
  const ROOT_URL = process.env.NEXT_PUBLIC_DIALER;
  const DIALER_USER = process.env.NEXT_PUBLIC_DIALER_USER;
  const DIALER_PASSWORD = process.env.NEXT_PUBLIC_DIALER_PASSWORD;

  if (!ROOT_URL || !DIALER_USER || !DIALER_PASSWORD) {
    throw { message: "Missing dialer environment configuration." };
  }
  const params = new URLSearchParams({
    function: "recording_status_filter",
    user: DIALER_USER,
    pass: DIALER_PASSWORD,
    header: "YES",
    stage: "tab",
    source: "test",
    date: `${date}`,
    agent_user: `${agent_user}`,
    duration: "Y",
    page: "1",
    per_page: "50",
    phone_number: `${phone_number}`,
    lead_id: `${lead_id}`,
  });

  try {
    // const url = `http://${process.env.NEXT_PUBLIC_SERVER}/vicidial/non_agent_api_V2.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=DAR3UI49T5MV2&agent_user=9001&date=2025-04-18&duration=Y&header=YES`;
    const url = `http://${process.env.NEXT_PUBLIC_SERVER}/vicidial/non_agent_api_V2.php?${params.toString()}`;

    const response = await fetch(url);
    const text = await response.text();

    // if (text.startsWith("ERROR:")) {
    //   throw new Error(text);
    // }

    if (text.startsWith("ERROR:")) {
      return { message: text };
    }
    const data = parseVicidialResponse(text);

    return { data };
  } catch (error) {
    // logger.error(`User ${user_id} encountered an error during recordings lookup: ${error}`);
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    throw new Error(message);
  }
};

// // console.log("recordings ", text);
// if (text.startsWith("ERROR:")) {
//   return { message: text };
// }
