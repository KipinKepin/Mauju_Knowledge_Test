import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div
        className="flex flex-col items-center justify-center p-4 absolute"
        style={{ top: "40%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <img
          src={user.photo}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4 shadow-lg"
        />
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md text-center">
          <p className="text-lg font-semibold">Name: {user.name}</p>
          <p className="text-lg font-semibold">Email: {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
