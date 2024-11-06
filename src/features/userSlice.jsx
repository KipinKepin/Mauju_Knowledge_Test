import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pengguna: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isError: false,
  isLoading: false,
};

const baseUrl = "https://public-api.delcom.org/api/v1";

export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    try {
      const response = await axios.get(`${baseUrl}/users`, {
        headers: {
          Authorization: `Bearer ${state.pengguna.token}`,
        },
      });
      console.log(response);

      return response.data.data.users;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "pengguna",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.pengguna = action.payload),
        (state.token = action.payload.token);
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      (state.isLoading = false), (state.isError = true);
    });
  },
});

export default userSlice.reducer;
