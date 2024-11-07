import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// defining initial state
const initialState = {
  // get current user from localstorage, or set it to null
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: null,
  // get current token from localstorage, or set it to null
  token: localStorage.getItem("token") || null,
};

// using free API
const baseUrl = "https://public-api.delcom.org/api/v1";

// create login function
export const LoginUser = createAsyncThunk(
  "user/LoginUser",
  async (user, thunkAPI) => {
    try {
      // sending email and password using post to the api for login
      const response = await axios.post(`${baseUrl}/auth/login`, {
        email: user.email,
        password: user.password,
      });
      console.log(response.data);

      // setting user and token of current user
      return {
        user: response.data.data.user,
        token: response.data.data.token,
      };
    } catch (error) {
      // returning error message
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// creating register function
export const RegisterUser = createAsyncThunk(
  "user/RegisterUser",
  async (user, thunkAPI) => {
    try {
      // sending name, email, and username using post to the api
      const response = await axios.post(`${baseUrl}/auth/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return response.data;
    } catch (error) {
      // return error if cannot doing the request
      if (error.response) {
        const message = error.response.data.message;
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

// creating authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  // functions that will be used
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      // deleting user and token after logging out
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  // case if the function is pending, success(fullfilled), or rejected
  extraReducers: (builder) => {
    // if the login is pending, set loading state to true
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    // if the login is success:
    /*
      set isLoading state to false,
      set isSuccess state to true,
      get the user and token from the payload that come from the login function before
      set the user and token to localstorage
    */
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isSuccess = true),
        (state.user = action.payload),
        (state.token = action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    });
    // if the login is rejected(failed), set:
    /*
      isLoading state to false,
      isError state to true,
      message state containing error message
    */
    builder.addCase(LoginUser.rejected, (state, action) => {
      (state.isLoading = false),
        (state.isError = true),
        (state.message = action.payload);
    });

    // do the same thing from the login to the register case
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

// exporting what will we use later
export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
