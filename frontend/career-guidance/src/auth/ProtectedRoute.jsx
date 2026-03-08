import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("access_token"); // if token use pannina

  if (!user && !token) {
    // ❌ login illa
    return <Navigate to="/" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
