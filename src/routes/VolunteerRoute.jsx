import { Navigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";
import useAuth from "../hooks/useAuth";

const VolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [UserInfo, refetch, isLoading] = useUserInfo();

  if (loading || !UserInfo) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && UserInfo?.role === "volunteer") {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default VolunteerRoute;
