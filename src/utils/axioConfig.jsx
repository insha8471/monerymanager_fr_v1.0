import axios from "axios";
import { BASE_URL } from "./apiEndpoints";

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type" : "application/json",
        Accept: "application/json"
    }
});

// list of endpoint that do not require authorization header 
const excludeEndpoint = ["/login", "/register" , "/status", "/health", "/activate"]



// request intercepts , it will add authorization header to every request except the ones in excludeEndpoint array
axiosConfig.interceptors.request.use((config) => {
    const shouldSkipToken = excludeEndpoint.some((endpoint) => {
        return config.url?.includes(endpoint)
    });

    if(!shouldSkipToken) {
        const accessToken = localStorage.getItem("token");
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


// response intercepts , it will check for 401 and 500 status codes
axiosConfig.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if(error.response) {
        if(error.response.status === 401) {
            window.location.href = "/login";
        }else if(error.response.status === 500) {
            console.error("Server error. Please try again later.");
        }
    }
    else if(error.code === "ECONNABORTED") {
        console.error("Request timeout. Please try again later.");
    }
    return Promise.reject(error);
});

export default axiosConfig;