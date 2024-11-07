import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// set the state that will be used
const initialState = {
  // set the initial value
  pengguna: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isError: false,
  isLoading: false,
};

// free api
const baseUrl = "https://public-api.delcom.org/api/v1";

// create function to fetch all users that have been registered
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();

    try {
      const response = await axios.get(`${baseUrl}/users`, {
        // because accessing the route '/users' need authorization, we use bearer token using the token from localstorage
        headers: {
          Authorization: `Bearer ${state.pengguna.token}`,
        },
      });
      console.log(response);

      return response.data.data.users;
    } catch (error) {
      // return error if cannot doing request
      return thunkAPI.rejectWithValue("Failed to fetch user");
    }
  }
);

// create userslice
const userSlice = createSlice({
  name: "pengguna",
  initialState,
  reducers: {},
  // function to set the state if the request is success or rejected
  extraReducers: (builder) => {
    // set the loading to true
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    // setting the user and token state from action.payload
    builder.addCase(getUsers.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.pengguna = action.payload),
        (state.token = action.payload.token);
    });
    // set the loading to false and the error to true
    builder.addCase(getUsers.rejected, (state, action) => {
      (state.isLoading = false), (state.isError = true);
    });
  },
});

// exporting reducer that will be user
export default userSlice.reducer;
