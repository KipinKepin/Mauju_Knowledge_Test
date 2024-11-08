import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import transactionReducer from "../features/transactionsSlice";
import userReducer from "../features/userSlice";

// global state that will be used
export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
    pengguna: userReducer,
  },
});
