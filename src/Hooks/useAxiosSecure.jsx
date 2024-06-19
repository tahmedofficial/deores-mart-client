import axios from "axios";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})

const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use((config) => {
        const token = localStorage.getItem("auth-token");
        config.headers.authorization = token
        return config;
    }, (error) => {
        return Promise.reject(error);
    })

    // axiosSecure.interceptors.response.use((response) => {
    //     return response;
    // }, async (error) => {
    //     const status = error.response.status;
    //     console.log("status", status);
    //     if (status === 401 || status === 403) {
    //         // 
    //     }
    //     return Promise.reject(error);
    // })

    return axiosSecure;
};

export default useAxiosSecure;