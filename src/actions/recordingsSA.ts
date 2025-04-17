"use server";

import { ViciFilterParamsType } from "@/utils/schemas";
import axios from "axios";

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
