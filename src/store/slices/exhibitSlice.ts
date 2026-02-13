import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

export const createExhibit = createAsyncThunk("exhibits/create", async ({ text, image }: { text: string; image: File }) => {
    const formData = new FormData();
    formData.append("description", text);
    formData.append("image", image);

    const res = await axiosInstance.post("/api/exhibits", formData);
    return res.data;
});

const exhibitSlice = createSlice({
  name: "exhibits",
  initialState: { loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createExhibit.pending, (state) => {
        state.loading = true;
      })
      .addCase(createExhibit.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createExhibit.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default exhibitSlice;
