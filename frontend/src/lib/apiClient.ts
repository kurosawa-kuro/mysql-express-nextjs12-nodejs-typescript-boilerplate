import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
