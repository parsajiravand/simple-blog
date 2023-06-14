import axios from "axios";
// Create Axios instance with base URL
const baseURL = import.meta.env.VITE_APP_BASE_URL;
export const api = axios.create({
  baseURL,
});
