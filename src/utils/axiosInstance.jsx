import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const baseURL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
});
// handle responses and errors from HTTP requests.
axiosInstance.interceptors.response.use(
//  allows successful responses to pass through without any changes.
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      const navigate = useNavigate();
      navigate('/login');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
