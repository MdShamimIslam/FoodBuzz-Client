import axios from "axios";

export const axiosPublic = axios.create({
  baseURL: "https://foodbuzz-server.vercel.app",
});