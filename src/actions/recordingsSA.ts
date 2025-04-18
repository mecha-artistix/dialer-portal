"use server";

import { ViciFilterParamsType } from "@/utils/schemas";

function parseVicidialResponse(text) {
  const lines = text.trim().split("\n").slice(1); // skip header
  return lines.map((line) => {
    const parts = line.trim().split(/\s+/);
    return {
      start_time: `${parts[0]} ${parts[1]}`,
      user: parts[2],
      recording_id: parts[3],
      lead_id: parts[4],
      duration: parts[parts.length - 2],
      location: parts[parts.length - 1],
    };
  });
}
export const getRecordingsSA = async (viciFilterParams: ViciFilterParamsType) => {
  try {
    const url =
      "http://91.107.210.97/vicidial/non_agent_api_V2.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=DAR3UI49T5MV2&agent_user=9001&date=2025-04-18&duration=Y&header=YES";

    const response = await fetch(url);
    const text = await response.text();

    if (text.startsWith("ERROR:")) {
      return { message: text };
    }

    const data = parseVicidialResponse(text);
    console.log(data); // move this after data is defined

    return { data };
  } catch (error) {
    // logger.error(`User ${user_id} encountered an error during recordings lookup: ${error}`);
    throw { message: "An unexpected error occurred." };
  }
};

/*
import { ViciFilterParamsType } from "@/utils/schemas";
import axios from "axios";

export const getRecordingsSA = async (viciFilterParams: ViciFilterParamsType) => {
  console.log("get recording requested ", { viciFilterParams });

  const ROOT_URL = process.env.NEXT_PUBLIC_DIALER;
  const DIALER_USER = process.env.NEXT_PUBLIC_DIALER_USER;
  const DIALER_PASSWORD = process.env.NEXT_PUBLIC_DIALER_PASSWORD;

  if (!ROOT_URL || !DIALER_USER || !DIALER_PASSWORD) {
    throw { message: "Missing dialer environment configuration." };
  }

  // const {
  //   date = "",
  //   agent_user = "",
  //   // duration = "Y",
  //   page = 1,
  //   per_page = 50,
  //   // statusFilter = "",
  //   phone_number = "",
  //   lead_id = "",
  // } = viciFilterParams;

  // const status = Array.isArray(statusFilter) ? statusFilter.join(",") : statusFilter || "";

  // const params = new URLSearchParams({
  //   function: "recording_status_filter",
  //   user: DIALER_USER,
  //   pass: DIALER_PASSWORD,
  //   header: "YES",
  //   stage: "tab",
  //   source: "test",
  //   date,
  //   agent_user: agent_user.trim(),
  //   duration,
  //   page: String(page),
  //   per_page: String(per_page),
  //   status,
  //   phone_number,
  //   lead_id,
  // });

  // const url = `${ROOT_URL}/vicidial/non_agent_api_V2.php?${params.toString()}`;
  const url = `${ROOT_URL}/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=${DIALER_USER}&pass=${DIALER_PASSWORD}&header=YES&stage=tab&source=test&date=${"2025-04-15"}&agent_user=&duration=Y&page=1&per_page=50&status=&phone_number=&lead_id=${""}`;

  try {
    const response = await axios.get(url, { responseType: "text" });
    const text = response.data.trim();

    if (text.startsWith("ERROR:")) {
      throw { message: text };
    }

    const lines = text.split("\n");
    const headers = lines[0].split("|");
    const dataLines = lines.slice(1, -1);
    const metaLine = lines[lines.length - 1];

    let meta = {};
    try {
      meta = JSON.parse(metaLine).meta || {};
    } catch (e) {
      console.error("Metadata parsing failed:", e);
    }

    const data = dataLines.map((line) => {
      const values = line.split("|");
      return Object.fromEntries(headers.map((key, i) => [key, values[i] ?? ""]));
    });

    return { data, ...meta };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.data) {
        throw { message: error.response.data };
      } else if (error.message) {
        throw { message: error.message };
      } else {
        throw { message: "No response received from server." };
      }
    }
    throw { message: error?.message || "An unexpected error occurred." };
  }
};

/*

export const getRecordingsSA = async (viciFilterParams: ViciFilterParamsType) => {
  console.log("get recording requested ", { viciFilterParams });
  const ROOT_URL = process.env.NEXT_PUBLIC_DIALER;
  const DIALER_USER = process.env.NEXT_PUBLIC_DIALER_USER;
  const DIALER_PASSWORD = process.env.NEXT_PUBLIC_DIALER_PASSWORD;
  const url = `${ROOT_URL}/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=${DIALER_USER}&pass=${DIALER_PASSWORD}&header=YES&stage=tab&source=test&date=${"2025-04-15"}&agent_user=&duration=Y&page=1&per_page=50&status=&phone_number=&lead_id=${""}`;
  try {
    const response = await axios.get(url, { responseType: "text" });

    const text = response.data.trim();
    console.log({ text });
    const lines = text.split("\n");

    const headers = lines[0].split("|");
    const dataLines = lines.slice(1, -1);
    const metaLine = lines[lines.length - 1];

    let meta = {};
    try {
      meta = JSON.parse(metaLine).meta || {};
    } catch (e) {
      console.error("Metadata parsing failed:", e);
    }

    const data = dataLines.map((line) => {
      const values = line.split("|");
      return Object.fromEntries(headers.map((key, i) => [key, values[i] ?? ""]));
    });

    return { data, ...meta };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data; // Throw full error response
      } else if (error.request) {
        throw { message: "No response received from server." };
      }
    }
    throw { message: "An unexpected error occurred." };
  }
};

/*

export const getRecordingsSA = async () => {
  console.log("get recording requested");
  const ROOT_URL = process.env.NEXT_PUBLIC_DIALER;
  const DIALER_USER = process.env.NEXT_PUBLIC_DIALER_USER;
  const DIALER_PASSWORD = process.env.NEXT_PUBLIC_DIALER_PASSWORD;
  const url = ${ROOT_URL}/vicidial/non_agent_api_V2.php?function=recording_status_filter&user=${DIALER_USER}&pass=${DIALER_PASSWORD}&header=YES&stage=tab&source=test&date=${"2025-04-15"}&agent_user=&duration=Y&page=1&per_page=50&status=&phone_number=&lead_id=${""};
  try {
    const res = await axios.get(url, { responseType: "text" });
    const text = res.data.trim();
    console.log({ text });
    const lines = text.split("\n");

    const headers = lines[0].split("|");
    const dataLines = lines.slice(1, -1);
    const metaLine = lines[lines.length - 1];

    // const meta = {};
    // try {
    //   meta = JSON.parse(metaLine).meta || {};
    // } catch (e) {
    //   console.error("Metadata parsing failed:", e);
    // }

    const data = dataLines.map((line) => {
      const values = line.split("|");
      return Object.fromEntries(headers.map((key, i) => [key, values[i] ?? ""]));
    });

    // return { data, ...meta };
    return { data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error.response.data; // Throw full error response
      } else if (error.request) {
        throw { message: "No response received from server." };
      }
    }
    throw { message: "An unexpected error occurred." };
  }
};


*/

// console.log({ response });
// const html = response.data;
// // extract plain text from the body
// const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
// const bodyText = match ? match[1].split("<")[0].trim() : "";
// // example: "ERROR: recording_lookup NO RECORDINGS FOUND - 6666|1013||2024-10-24|"
// const parts = bodyText.split(" - ");
// const message = parts[0];
// const data = parts[1]?.split("|");

// console.log({ message, data });
// return { message, data };
