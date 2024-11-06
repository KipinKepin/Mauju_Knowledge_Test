import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

const transactionUrl = "http://localhost:5000/transactions";

export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(transactionUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch transactions");
    }
  }
);

export const addTransactions = createAsyncThunk(
  "transactions/addTransactions",
  async ({ name, price, date, status }, thunkAPI) => {
    try {
      const response = await axios.post(transactionUrl, {
        name,
        price,
        date,
        status,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add transactions");
    }
  }
);

export const editTransactions = createAsyncThunk(
  "transactions/editTransactions",
  async ({ id, name, price, date, status }, thunkAPI) => {
    try {
      const response = await axios.patch(`${transactionUrl}/${id}`, {
        name,
        price,
        date,
        status,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add transactions");
    }
  }
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    await axios.delete(`${transactionUrl}/${id}`);
    return id;
  }
);

const transactionEntity = createEntityAdapter({
  selectId: (transaction) => transaction.id,
});

const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionEntity.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      transactionEntity.setAll(state, action.payload);
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      transactionEntity.setAll(state, action.payload);
    });
    builder.addCase(addTransactions.fulfilled, (state, action) => {
      transactionEntity.addOne(state, action.payload);
    });
    builder.addCase(editTransactions.fulfilled, (state, action) => {
      transactionEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      transactionEntity.removeOne(state, action.payload);
    });
  },
});

export const transactionSelector = transactionEntity.getSelectors(
  (state) => state.transactions
);
export default transactionsSlice.reducer;
