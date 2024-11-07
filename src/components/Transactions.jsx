import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// get all the function from the slice
import {
  getTransactions,
  transactionSelector,
  deleteTransaction,
} from "../features/transactionsSlice";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

// Helper function to format date in Indonesian format
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const Transactions = () => {
  const dispatch = useDispatch();
  // fetching all transactions
  const transactions = useSelector(transactionSelector.selectAll);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  // filtering function, so that user can search by id, name, price, date, and status
  const filteredTransactions = transactions.filter((transaction) => {
    const lowerQuery = searchQuery.toLowerCase();

    return (
      transaction.id.toString().toLowerCase().includes(lowerQuery) ||
      transaction.name.toLowerCase().includes(lowerQuery) ||
      transaction.price.toString().toLowerCase().includes(lowerQuery) ||
      formatDate(transaction.date).toLowerCase().includes(lowerQuery) ||
      transaction.status.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          {/* button to add a new transaction */}
          <Link to="/transactions/add" className="btn btn-success rounded-full">
            ➕ Add new
          </Link>
          <p className="capitalize">Transactions</p>
          <label className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
            {/* search bar */}
            <input
              type="text"
              className="bg-transparent outline-none w-full"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">No</th>
                <th className="py-3 px-6 text-left">Transactions</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Date</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {/* mapping all the transactions data to table data */}
              {filteredTransactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{index + 1}</td>
                  <td className="py-3 px-6 text-left">{transaction.name}</td>
                  <td className="py-3 px-6 text-left">${transaction.price}</td>
                  <td className="py-3 px-6 text-left">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-6 text-left font-bold">
                    <em>
                      <span
                        className={`px-3 py-1 rounded-full text-white ${
                          transaction.status === "pending"
                            ? "bg-yellow-400"
                            : transaction.status === "accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </em>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {/* button for navigating user to edit page */}
                    <Link
                      to={`/transactions/edit/${transaction.id}`}
                      className="btn btn-info mr-2 rounded-full"
                    >
                      ✏️
                    </Link>
                    {/* button for deleting transaction by id */}
                    <button
                      onClick={() =>
                        dispatch(deleteTransaction(transaction.id))
                      }
                      className="btn btn-error rounded-full"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* if no transaction found */}
          {filteredTransactions.length === 0 && (
            <p className="text-center text-gray-500 mt-4">
              No transactions found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
