import axios from "axios";
import { getItem } from "../persistance-storage/persistance-storage";

axios.defaults.baseURL = "http://localhost:3000/api";

axios.interceptors.request.use((config) => {
  const token = getItem("token");
  const authorization = token ? `Token: ${token}` : "";
  config.headers.authorization = authorization;
  console.log(config);
  return config;
});

export default axios;
