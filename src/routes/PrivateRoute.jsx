import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectUser } from "../redux/auth/selectors";

export default function PrivateRoute({ children }) {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
