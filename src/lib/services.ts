import { apiFlask } from "./interceptors";

export const sendTranscribeRequest = (url) => {
  return new Promise((resolve, reject) => {
    try {
      console.log("Submitting to /upload with URL:", url);

      // Create a form element
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "http://qaportal.dialer360.com:5001/upload"; // Full URL to Flask server
      form.target = "_blank"; // Open in a new tab

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

export const getDialerConfig = async () => {
  try {
    const response = await apiFlask("/portal/configure-dialer");
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
