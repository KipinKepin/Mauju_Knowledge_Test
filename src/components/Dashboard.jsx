import React from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <Navbar />
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">
              Welcome friend, {user.name}!
            </h1>
            <p className="py-6 text-sm sm:text-base lg:text-lg">
              Welcome to our website, where we provide you with the tools and
              resources to efficiently manage your finances. Whether you're
              looking to track your expenses, create a budget, or set savings
              goals, our platform offers a range of features designed to help
              you take control of your financial future. With easy-to-use tools
              and insightful reports, we aim to empower you to make informed
              financial decisions and achieve your financial goals with
              confidence.
            </p>
            <Link to={"/transactions"} className="btn btn-primary">
              Manage Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
