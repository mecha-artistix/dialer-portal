import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { apiFlask } from "./interceptors";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateSession = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await apiFlask.get("/auth/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: unknown) {
    // Check for response data for more specific error handling
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Unauthorized access"}`);
    }

    throw error;
  }
};
