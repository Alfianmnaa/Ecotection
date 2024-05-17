import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ecotection-vercel-api.vercel.app/",
});
