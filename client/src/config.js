import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ecotection-api-production.up.railway.app/",
});
