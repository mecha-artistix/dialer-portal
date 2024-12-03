import axios from "axios";

// Create an Axios instance
const apiFlask = axios.create({
  baseURL: import.meta.env.VITE_FLASK_API,
});

// Request interceptor to add token to each request
apiFlask.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Middleware-like interceptor for handling responses
apiFlask.interceptors.response.use(
  (response) => {
    // console.log("log from interceptor - DATA", response.data);
    return response;
  },
  (error) => {
    console.log("log from interceptor - ERROR", error);
    // Handle errors globally
    if (error.response) {
      // Customize based on status code, for example
      if (error.response.status === 401) {
        console.log("Unauthorized - redirecting to login");
        // store.dispatch(logout());
        window.location.href = `/login?from=${encodeURIComponent(window.location.pathname)}`;
      } else if (error.response.status === 500) {
        console.log("Server error - try again later");
      }
    } else if (error.request) {
      console.log("Network error - please check your connection");
    }
    return Promise.reject(error);
  },
);

export { apiFlask };
