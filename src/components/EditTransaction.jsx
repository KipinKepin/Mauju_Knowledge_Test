import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactions,
  editTransactions,
  transactionSelector,
} from "../features/transactionsSlice";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const EditTransaction = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const transaction = useSelector((state) =>
    transactionSelector.selectById(state, id)
  );

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transaction) {
      setName(transaction.name);
      setPrice(transaction.price);
      setDate(transaction.date);
      setStatus(transaction.status);
    }
  }, [transaction]);

  const handleEditTransaction = async (e) => {
    e.preventDefault();
    await dispatch(editTransactions({ id, name, price, date, status }));
    navigate("/transactions");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <form
        onSubmit={handleEditTransaction}
        className="bg-white p-8 rounded shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Edit Transaction
        </h2>
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
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTransaction;
