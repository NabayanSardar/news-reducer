import Cookies from "js-cookie";
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/auth/CreateAuthContext";

const AdminProtected = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("Authcontext new provider");
  }
  console.log("authcontext", authContext);
  //console.log("admin protected", token, user);
  const isAdminAuth = authContext?.authstate?.token && authContext?.authstate?.user.role === "admin";
  return isAdminAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminProtected;
