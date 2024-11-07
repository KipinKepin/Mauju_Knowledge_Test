import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";

// api of transactions
const transactionUrl = "http://localhost:5000/transactions";

// create function to fetch all the transactions
export const getTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async (token, thunkAPI) => {
    try {
      const response = await axios.get(transactionUrl);
      return response.data;
    } catch (error) {
      // return error if cannot doing the request
      return thunkAPI.rejectWithValue("Failed to fetch transactions");
    }
  }
);

// create function to add transaction
export const addTransactions = createAsyncThunk(
  "transactions/addTransactions",
  // using the data that we need to create the transaction
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
      // return error if cannot doing the request
      return thunkAPI.rejectWithValue("Failed to add transactions");
    }
  }
);

// create function to edit a transaction by it's id
export const editTransactions = createAsyncThunk(
  "transactions/editTransactions",
  // we need the same data like the addtransaction, but we also need the id
  async ({ id, name, price, date, status }, thunkAPI) => {
    try {
      // using patch for editing
      const response = await axios.patch(`${transactionUrl}/${id}`, {
        name,
        price,
        date,
        status,
      });
      return response.data;
    } catch (error) {
      // return error if cannot doing the request
      return thunkAPI.rejectWithValue("Failed to add transactions");
    }
  }
);

// create function to delete a transaction by it's id
export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id) => {
    // using delete for deleting
    await axios.delete(`${transactionUrl}/${id}`);
    return id;
  }
);

// create the entity of the transaction that we will create
const transactionEntity = createEntityAdapter({
  selectId: (transaction) => transaction.id,
});

// creating the transaction slice
const transactionsSlice = createSlice({
  name: "transactions",
  initialState: transactionEntity.getInitialState(),
  reducers: {},
  // function to set the state if the request is success or rejected
  extraReducers: (builder) => {
    builder.addCase(getTransactions.fulfilled, (state, action) => {
      transactionEntity.setAll(state, action.payload);
    });
    builder.addCase(getTransactions.rejected, (state, action) => {
      transactionEntity.setAll(state, action.payload);
    });
    // using addone to adding a new transaction
    builder.addCase(addTransactions.fulfilled, (state, action) => {
      transactionEntity.addOne(state, action.payload);
    });
    // using update one, id, and the updated data to updating
    builder.addCase(editTransactions.fulfilled, (state, action) => {
      transactionEntity.updateOne(state, {
        id: action.payload.id,
        updates: action.payload,
      });
    });
    // using removeone for deleting the transaction by the id
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      transactionEntity.removeOne(state, action.payload);
    });
  },
});

// exporting all the function
export const transactionSelector = transactionEntity.getSelectors(
  (state) => state.transactions
);
export default transactionsSlice.reducer;
