import axios from "axios";
import { useAuth } from "../context/authContext"

const useAxios = () => {

    const url = process.env.REACT_APP_BASE_URL;
    const { user } = useAuth();

    const apiClient = axios.create({
        baseURL: url,
    });

    apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = user ? `Bearer ${user.accessToken}` : "";
        return config;
    });

    return apiClient;
}

export default useAxios;


