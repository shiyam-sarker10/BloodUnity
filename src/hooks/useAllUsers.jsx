import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useAllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const {
      refetch: originalRefetch,
      data: AllUsers,
      isLoading,
    } = useQuery({
      queryKey: ["allUsers"],

      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/allUsers`);
          return res.data;
        } catch (error) {
          console.error("Error fetching req information:", error);
          throw error;
        }
      },
    });
    const refetch = () => originalRefetch();
    return { AllUsers, isLoading, refetch };
};

export default useAllUsers;