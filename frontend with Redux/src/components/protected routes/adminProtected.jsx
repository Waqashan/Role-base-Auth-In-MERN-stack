import { Navigate } from "react-router-dom";
export const AdminRoute = ({ element }) => {
  const token = localStorage.getItem("mytoken");
  if (!token) {
    // If token doesn't exist, redirect to login page
    return <Navigate to="/login" />;
  }
  const tokenPayload = JSON.parse(atob(token.split(".")[1]));
  // console.log(tokenPayload,"tttt");
  const isAdmin = token && tokenPayload.role === "admin";

  return isAdmin ? element : <Navigate to="/login" />;
};