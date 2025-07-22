import axios from "axios";
import { LocalStorage } from "../constants/localStorage.constant";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    "Content-Type": "Application/json",
  },
});

api.interceptors.request.use((config) => {
  const accessToken = JSON.parse(
    localStorage.getItem(LocalStorage.auth)
  )?.token;
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
}, Promise.reject);

api.interceptors.response.use(
  (value) => value.data,
  (error) => {
    if (error.code === 401) {
      const navigate = useNavigate();
      localStorage.removeItem(LocalStorage.auth);
      navigate("/login");
    }
    return Promise.reject(error);
  }
);

// Axios config
const apiDefault = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    "Content-Type": "Application/json",
  },
});

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_SERVER}/api/v1`,
  headers: {
    'Content-Type': 'Application/json',
  },
})
adminApi.interceptors.request.use((config) => {
  const accessToken = JSON.parse(localStorage.getItem('auth'))?.token
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, Promise.reject)

export { apiDefault, api, adminApi };


// config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGUiOiJCUVQiLCJpYXQiOjE3NTMxOTUzNTIsImV4cCI6MTc1MzI4MTc1Mn0.U3nlVoGwV2SM2cFQFDa5hhvgnaRblJdJ6BIPuE1bVbA`