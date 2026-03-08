import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken");

  if (!adminToken) {
    // ❌ admin login illa
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminProtectedRoute;
