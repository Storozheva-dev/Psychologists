import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";

export default function RestrictedRoute({ children, restricted = false }) {
  const user = useSelector(selectUser);

  if (restricted && user) {
    return <Navigate to="/psychologists" replace />;
  }

  return children;
}
