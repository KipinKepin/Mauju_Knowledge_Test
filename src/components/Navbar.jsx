import React, { useEffect } from "react";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      {/* Navbar */}
      <div
        className="navbar bg-primary text-primary-content"
        style={{ position: "fixed", width: "100%", top: 0, zIndex: 1000 }}
      >
        <div className="flex-1">
          <Link to={"/transactions"} className="btn btn-ghost text-xl">
            GoFinance
          </Link>
        </div>
        <div className="flex-none">
          {/* Using Link components for navigation */}
          <Link to="/dashboard" className="btn btn-ghost">
            Dashboard
          </Link>
          <Link to="/users" className="btn btn-ghost">
            Users
          </Link>
          <Link to="/transactions" className="btn btn-ghost">
            Transactions
          </Link>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="profile picture"
                  src={user.photo || user.user.photo}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
            >
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                </a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content with padding to avoid overlap */}
      <div style={{ paddingTop: "60px" }}>
        {/* Dashboard content goes here */}
      </div>
    </>
  );
};

export default Navbar;
