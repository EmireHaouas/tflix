import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser();

  if (loading) return null;

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
