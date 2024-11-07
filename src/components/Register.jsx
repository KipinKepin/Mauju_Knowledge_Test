import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// get all the function from the slice
import { RegisterUser, reset } from "../features/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting all the state
  const { isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  // Reset state when the component loads to avoid immediate redirects
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(
    () => {
      // if the login is success, navigate to login page
      if (isSuccess) {
        console.log("Registration successful");
        navigate("/");
        dispatch(reset());
      }
    },
    // the function will run by the dependencies below
    [isSuccess, navigate, dispatch]
  );

  // sending the data using the registeruser function
  const Auth = (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ name, email, password }));
  };

  return (
    <div className="flex h-screen">
      <div className="hidden lg:flex w-1/2 bg-gradient-to-b from-blue-500 to-blue-800 items-center justify-center text-white">
        <div className="text-left">
          <h1 className="text-4xl font-bold mb-2">GoFinance</h1>
          <p className="mb-4">Your trusted financial management</p>
          <Link
            to={"/more"}
            className="bg-blue-400 py-2 px-4 rounded-full shadow-md hover:bg-gray-100 hover:text-black"
          >
            Read More
          </Link>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center bg-white">
        <form className="bg-white p-3 rounded w-80" onSubmit={Auth}>
          <h2 className="text-2xl font-bold">Welcome!</h2>
          <p className="text-gray-600 mb-4">Create your account</p>

          {/* display the error message */}
          {isError && (
            <div className="toast toast-top toast-right">
              <div className="alert alert-error text-white">
                <span>{message}</span>
              </div>
            </div>
          )}

          <label className="input input-bordered flex items-center gap-2 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-2"
          >
            Register
          </button>
          <div className="flex justify-between">
            Already have an account?
            <a href="/" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
