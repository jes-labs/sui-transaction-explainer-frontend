import axios from "axios";

// Base URL logic:
// 1. In development (and production if same domain), use relative path to trigger Next.js rewrites
// 2. This bypasses CORS by proxying through the Next.js server
const BASE_URL = "/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for generic error handling if needed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
