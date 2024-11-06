import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  token: localStorage.getItem("token") || null,
};

const baseUrl = "https://public-api.delcom.org/api/v1";

export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);

      return {
        user: response.data.data.user,
        token: response.data.data.token,
      };
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(`${baseUrl}/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  // functions yang akan digunakan
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.user = action.payload),
        (state.token = action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload);
    });
    builder.addCase(RegisterUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(RegisterUser.fulfilled, (state, action) => {
      (state.isLoading = false), (state.isSuccess = true);
    });
    builder.addCase(RegisterUser.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload);
    });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
