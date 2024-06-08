import { Navigate } from "react-router-dom";

export const UserProtectedRoute = ({ element }) => {
  const token = localStorage.getItem("mytoken");
  if (!token) {
    // If token doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  const isAdmin = tokenPayload && tokenPayload.role === "user";

  return isAdmin ? element : <Navigate to="/login" />;
};
