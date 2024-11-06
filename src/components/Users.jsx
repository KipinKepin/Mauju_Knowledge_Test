import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../features/userSlice";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

const Users = () => {
  const { pengguna } = useSelector((state) => state.pengguna);
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  // Cek apakah pengguna adalah array sebelum mencoba untuk memanggil filter
  const filteredPengguna = Array.isArray(pengguna)
    ? pengguna.filter((orang) => {
        const lowerQuery = searchQuery.toLowerCase();
        return (
          orang.id.toString().toLowerCase().includes(lowerQuery) ||
          orang.name.toLowerCase().includes(lowerQuery) ||
          orang.email.toString().toLowerCase().includes(lowerQuery) ||
          formatDate(orang.created_at).toLowerCase().includes(lowerQuery)
        );
      })
    : []; // Jika bukan array, return array kosong

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4 gap-4">
          <Link to="/transactions" className="btn btn-success rounded-full">
            ⬅️ Go Back
          </Link>
          <p className="capitalize">Users</p>
          <label className="flex items-center gap-2 bg-white border border-gray-300 rounded-full px-4 py-2">
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
                <th className="py-3 px-6 text-left">Photo</th>
                <th className="py-3 px-6 text-left">Nama</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Bergabung</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {Array.isArray(filteredPengguna) &&
                filteredPengguna
                  .slice()
                  .reverse()
                  .map((orang, index) => (
                    <tr
                      key={orang.id}
                      className="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-6 text-left">{index + 1}</td>
                      <td className="py-3 px-6 text-left">
                        <img
                          src={orang.photo}
                          alt="p.pict"
                          className="w-12 h-12 rounded-full"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">{orang.name}</td>
                      <td className="py-3 px-6 text-left">{orang.email}</td>
                      <td className="py-3 px-6 text-left">
                        {formatDate(orang.created_at)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {filteredPengguna.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
