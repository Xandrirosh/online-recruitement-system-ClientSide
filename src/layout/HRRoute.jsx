import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import isHR from "../utils/isHR";

export default function HRRoute({ children }) {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isHR(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}