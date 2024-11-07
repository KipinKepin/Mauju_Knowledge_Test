// privateroute page
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// protecting the pages of user that did not logging in
const PrivateRoute = ({ children }) => {
  // get the current user
  const { user } = useSelector((state) => state.auth);

  // if the no user data, navigate user to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
