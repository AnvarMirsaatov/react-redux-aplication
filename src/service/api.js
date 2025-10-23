import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "http://localhost:3000/api";


axios.interceptors.request.use((config) => {
  const token = getItem("token"); 
  if (token) {
    config.headers.Authorization = `Token ${token}`; // ⚠️ katta harf va “:” o‘rniga bo‘sh joy
  }
  return config;
});


export default axios;
