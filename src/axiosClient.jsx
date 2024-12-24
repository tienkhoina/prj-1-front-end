// src/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL:'https://prj-1-back-end.onrender.com/api', 
    headers: {
        'Content-Type': 'application/json',
    }
});


axiosClient.interceptors.response.use(
    (response) => {

        return response.data;
    },
    (error) => {

        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosClient;