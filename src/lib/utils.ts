import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiFlask } from "./interceptors";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateSession = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await apiFlask.get("/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: AxiosError) {
    // Check for response data for more specific error handling
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Unauthorized access"}`);
    }

    throw error;
  }
};
