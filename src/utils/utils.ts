 import axios from 'axios'

// Create an axios instance
const axiosInstance = axios.create({
    baseURL: 'https://rebornv2api.onrender.com/api/v1/users/',
  });
  
  // Add a request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
  export default axiosInstance;
  