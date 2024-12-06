import axios, { AxiosResponse } from "axios";
import { apiFlask } from "./interceptors";
import { AddDialerFormType, NonAgentApiSchemaType } from "@/schemas";

export const validateSession = async (): Promise<AxiosResponse> => {
  try {
    const token = localStorage.getItem("token");

    const response: AxiosResponse = await apiFlask.get("/auth/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with a status other than 2xx
        throw new Error(`Error ${error.response.status}: ${error.response.data.message || "Unauthorized access"}`);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error("No response received from server.");
      }
    }
    // Non-Axios error
    throw new Error("An unexpected error occurred.");
  }
};

export const sendTranscribeRequest = (url: string) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Submitting to /upload with URL:", url);

      // Create a form element
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "http://qaportal.dialer360.com:5001/upload";
      form.target = "_blank";

      // Create an input for the URL
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "url";
      input.value = url;

      // Append the input to the form
      form.appendChild(input);

      // Append the form to the body and submit it
      document.body.appendChild(form);

      // Submit and resolve immediately since the request opens in a new tab
      form.submit();
      document.body.removeChild(form);

      // Resolve promise once the form submission is initiated
      resolve("Form submitted successfully");
    } catch (error) {
      reject(error); // Reject promise on any error
    }
  });
};
function removeNullUndefinedWithReduce(obj) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key] = typeof value === "object" ? removeNullUndefinedWithReduce(value) : value;
    }
    return acc;
  }, {});
}
export const getRecordings = async (
  data: NonAgentApiSchemaType | null,
  pagination: { page: number; per_page: number } = { page: 1, per_page: 150 },
  filter?: string[],
) => {
  const params = removeNullUndefinedWithReduce({ ...data });
  console.log({ params });
  try {
    const response: AxiosResponse = await apiFlask.post("/portal/recordings", {
      ...params,
      ...pagination,
      statusFilter: filter,
    });
    return response.data;
  } catch (error: unknown) {
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

export const getDialerConfig = async () => {
  try {
    const response = await apiFlask("/portal/configure-dialer");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const patchDialer = async (dialer_id: number, body: Omit<AddDialerFormType, "pass">) => {
  try {
    const response = await apiFlask.put(`/portal/configure-dialer/${dialer_id}`, body);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDialerReq = async (dialer_id: number) => {
  try {
    const response = await apiFlask.delete(`/portal/configure-dialer/${dialer_id}`);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
