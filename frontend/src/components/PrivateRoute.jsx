import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("bunso_token");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
