import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTransactions } from "../features/transactionsSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const AddTransaction = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("pending");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddTransaction = (e) => {
    e.preventDefault();
    dispatch(addTransactions({ name, price, date, status }));
    navigate("/transactions");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <form
        onSubmit={handleAddTransaction}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Transaction</h2>
        <input
          type="text"
          placeholder="Transaction Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-full bg-white"
        >
          <option value="pending">pending</option>
          <option value="accepted">accepted</option>
          <option value="rejected">rejected</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddTransaction;
