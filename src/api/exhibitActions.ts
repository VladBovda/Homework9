import axiosInstance from "./axiosInstance";

export const getAllExhibits = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axiosInstance.get(`/api/exhibits?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getUserExhibits = async (page: number = 1, limit: number = 10) => {
    try {
        const response = await axiosInstance.get(`/api/exhibits/my-posts?page=${page}&limit=${limit}`);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteExhibit = async (exhibitId: string | number) => {
    return await axiosInstance.delete(`/api/exhibits/${exhibitId}`);
};

