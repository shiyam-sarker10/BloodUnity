import { Navigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";
import useAuth from "../hooks/useAuth";

const DonorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [UserInfo, refetch, isLoading] = useUserInfo();

  if (loading || !UserInfo) {
    return (
      <div className="flex justify-center">
        <progress className="progress w-56 text-red-600"></progress>
      </div>
    );
  }

  if (user || UserInfo?.role === "donor") {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

export default DonorRoute;
