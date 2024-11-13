import axios from "axios";

// Create an Axios instance
const apiFlask = axios.create({
  baseURL: import.meta.env.VITE_FLASK_API,
});

// Request interceptor to add token to each request
apiFlask.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
    }
    return config;
  },
  (error) => {
    // Handle any errors in request setup
    return Promise.reject(error);
  }
);

// Middleware-like interceptor for handling responses
apiFlask.interceptors.response.use(
  (response) => {
    console.log("log from interceptor", response.data);
    // Handle and modify successful response data
    if (response.data) {
      // Assume the API wraps actual data in a `data` field
      return response.data; // Return the "data" object directly
    }
    return response; // Return the whole response if no modifications are needed
  },
  (error) => {
    console.log(error);
    // Handle errors globally
    if (error.response) {
      // Customize based on status code, for example
      if (error.response.status === 401) {
        console.log("Unauthorized - redirecting to login");
        // store.dispatch(logout());
        window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
      } else if (error.response.status === 500) {
        console.log("Server error - try again later");
        // e.g., show a notification for server issues
      }
    } else if (error.request) {
      // The request was made but no response received
      console.log("Network error - please check your connection");
    }
    return Promise.reject(error); // Pass the error to the calling code
  }
);

export { apiFlask };
