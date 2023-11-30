import { useQuery } from '@tanstack/react-query';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import useAxiosPublic from './useAxiosPublic';


const useUserInfo = () => {
    const axiosSecure = useAxiosSecure();

    const { user } = useAuth();
    const {
      refetch,
      data: UserInfo,
      isLoading,
      isPending,
    } = useQuery({
      queryKey: ["SingleUser", user?.email],

      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/user?email=${user?.email}`);
          return res.data[0];
        } catch (error) {
          console.error("Error fetching user information:", error);
          throw error;
        }
      },
      enabled: !!user,
    });
    return [UserInfo, refetch, isLoading, isPending];
};
export default useUserInfo;

