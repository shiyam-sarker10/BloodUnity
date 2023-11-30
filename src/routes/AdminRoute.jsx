import { Navigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";
import useAuth from "../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [UserInfo, refetch, isLoading] = useUserInfo();

  if (loading || !UserInfo) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56 "></progress>
      </div>
    );
  }

  if (user && UserInfo?.role === "admin") {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default AdminRoute;
