import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/auth/CreateAuthContext";

const AdminProtected = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext provider is missing");
  }

  const isAdminAuth =
    Boolean(authContext.authstate.token) &&
    authContext.authstate.user?.role === "admin";

  return isAdminAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminProtected;
