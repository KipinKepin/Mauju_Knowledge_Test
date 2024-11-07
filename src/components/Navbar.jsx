import React, { useState } from "react";
import { logout } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Track if menu is open

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
          <Link to={"/dashboard"} className="btn btn-ghost text-xl">
            GoFinance
          </Link>
        </div>

        {/* Menu icon for mobile view */}
        <div className="flex-none lg:hidden">
          <button
            className="btn btn-ghost text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ zIndex: 1050 }} // Ensures the button is always on top
          >
            ☰
          </button>
        </div>

        {/* Navigation links */}
        <div className="flex-none hidden lg:flex">
          <Link to="/dashboard" className="btn btn-ghost">
            Dashboard
          </Link>
          <Link to="/users" className="btn btn-ghost">
            Users
          </Link>
          <Link to="/transactions" className="btn btn-ghost">
            Transactions
          </Link>
        </div>

        <div className="flex-none lg:hidden">
          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div
              className="absolute top-0 left-0 w-full h-full bg-opacity-70 bg-black z-[1001] lg:hidden"
              onClick={() => setMenuOpen(false)} // Close menu if clicked outside
            >
              <div
                className="menu menu-sm dropdown-content bg-base-100 rounded-box p-2 shadow text-black z-[1002]"
                style={{ position: "absolute", top: "60px", left: 0, right: 0 }}
              >
                <li>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/users" onClick={() => setMenuOpen(false)}>
                    Users
                  </Link>
                </li>
                <li>
                  <Link to="/transactions" onClick={() => setMenuOpen(false)}>
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </div>
            </div>
          )}
        </div>

        {/* Avatar and Profile */}
        <div className="dropdown dropdown-end hidden lg:block">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="profile picture" src={user.photo || user.user.photo} />
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
    </>
  );
};

export default Navbar;
