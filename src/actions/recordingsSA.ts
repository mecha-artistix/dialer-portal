"use server";

import axios from "axios";
// import { cookies } from 'next/headers';
// import { logger } from '@/lib/logger'; // You'll need to create or import your logger

export interface ViciFilterParamsType {
  date?: string;
  agent_user?: string;
  duration?: string;
  page?: number;
  per_page?: number;
  statusFilter?: string | string[];
  phone_number?: string;
  lead_id?: string;
  folder_name?: string;
}

export const getRecordingsSA = async (viciFilterParams: ViciFilterParamsType) => {
  /*
  const user_id = cookies().get('user_id')?.value || 'unknown'; // Adapt based on your auth strategy
  
  logger.info(`User ${user_id} initiated a recordings lookup with data: ${JSON.stringify(viciFilterParams)}`);
  
  // Extract environment variables
  const dialer_url = process.env.NEXT_PUBLIC_DIALER;
  const user = process.env.NEXT_PUBLIC_DIALER_USER;
  const pass = process.env.NEXT_PUBLIC_DIALER_PASSWORD;
  
  // Ensure required parameters exist
  if (!dialer_url || !user || !pass) {
    throw { message: "Missing required environment variables (DIALER, DIALER_USER, or DIALER_PASSWORD)" };
  }
  
  // Process optional parameters with default values
  const {
    date = '',
    agent_user = '',
    duration = 'Y',
    page = 1,
    per_page = 100,
    statusFilter = '',
    phone_number = '',
    lead_id = '',
    folder_name = 'vicidial'
  } = viciFilterParams;
  
  // Process statusFilter if it's an array
  const status = Array.isArray(statusFilter) ? statusFilter.join(',') : statusFilter;
  
  // Prepare parameters for the VICIdial request
  const vicidial_params = {
    function: 'recording_status_filter',
    user,
    pass,
    date,
    agent_user: agent_user.trim(),
    duration,
    header: 'YES',
    stage: 'tab', // This is important - it indicates tab-separated format
    source: 'test',
    page,
    per_page,
    status,
    phone_number,
    lead_id
  };
  
  // Construct the URL
  const vicidial_url = `http://${dialer_url}/${folder_name}/non_agent_api_V2.php`;
  
  // Debug: Log the full URL
  const queryParams = new URLSearchParams();
  for (const [key, value] of Object.entries(vicidial_params)) {
    if (value !== undefined && value !== null) {
      queryParams.append(key, String(value));
    }
  }
  
  const full_url = `${vicidial_url}?${queryParams.toString()}`;
  logger.info(`User ${user_id} made request to ${full_url}`);
  */
  try {
    const url =
      "http://91.107.210.97/vicidial/non_agent_api.php?source=test&function=recording_lookup&stage=tab&user=6666&pass=DAR3UI49T5MV2&agent_user=9001&date=2025-04-18&duration=Y&header=YES";
    // Request data from VICIdial API
    const response = await axios.get(url, { responseType: "text" });
    const text = response.data.trim();

    // Check for VICIdial API errors
    if (text.startsWith("ERROR:")) {
      // logger.error(`VICIdial API Error: ${text}`);
      throw { message: text };
    }

    // Process the response - handling tab-separated values
    const lines = text.split("\n");

    // First line contains the column headers
    const headers = lines[0].split("\t");

    // Data lines are all but the last line (which contains metadata)
    const dataLines = lines.slice(1, -1);
    const metaLine = lines[lines.length - 1];

    // Parse metadata
    let meta = {};
    try {
      meta = JSON.parse(metaLine).meta || {};
      // logger.info(`User ${user_id} successfully fetched recordings page ${meta.current_page || 'unknown'} out of ${meta.total_pages || 'unknown'} where total recordings are ${meta.total_records || 'unknown'}.`);
    } catch (e) {
      // logger.error(`Metadata parsing failed: ${e}`);
    }

    // Parse tab-separated data lines into proper objects
    const data = dataLines.map((line) => {
      const values = line.split("\t");
      const rowObject = {};

      headers.forEach((header, index) => {
        rowObject[header] = values[index] || "";
      });

      return rowObject;
    });
    console.log({ data, meta });
    return { data, ...meta };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // logger.error(`VICIdial API Error: ${JSON.stringify(error.response.data)}`);
        throw error.response.data;
      } else if (error.request) {
        // logger.error(`No response received from server`);
        throw { message: "No response received from server." };
      }
    }
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
