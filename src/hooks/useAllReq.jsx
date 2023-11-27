import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useAllReq = () => {
  const {user} = useAuth()
     const axiosSecure = useAxiosSecure();
    const {
      refetch: originalRefetch,
      data: AllReq,
      isLoading,
    } = useQuery({
      queryKey: ["allReq", user?.email],

      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/allRequest?email=${user?.email}`);
          return res.data;
        } catch (error) {
          console.error("Error fetching req information:", error);
          throw error;
        }
      },
      enabled: !!user,
      
    });
    const refetch = () => originalRefetch();
    return { AllReq, isLoading, refetch };
};

export default useAllReq;