import axiosInstance from "./axiosInstance";

export const loginUser = async (credentials: { username: string; password: string }) => {
    const response = await axiosInstance.post("/api/auth/login", credentials);
    console.log(response.data);
    return response.data;
};

export const registerUser = async (userData: { username: string; password: string }) => {
    const response = await axiosInstance.post("/users/register", userData);
    console.log(response.data);
    return response.data;
};
