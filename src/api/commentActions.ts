import axiosInstance from "./axiosInstance";

const commentActions = {
  deleteComment: async (exhibitId: string, commentId: string) => {
    const response = await axiosInstance.delete(`/api/exhibits/${exhibitId}/comments/${commentId}`);
    return response.data;
  },
  createComment: async (exhibitId: string, data: { text: string }) => {
    const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, data);
    return response.data;
  },
  getComments: async (exhibitId: string) => {
    const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
    return response.data;
  },
};

export default commentActions;