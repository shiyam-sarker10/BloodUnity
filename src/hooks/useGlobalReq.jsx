import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useGlobalReq = () => {
 
    const axiosSecure = useAxiosSecure();
    const {
      refetch: originalRefetch,
      data: globalReq,
      isLoading,
    } = useQuery({
      queryKey: ["globalReq"],

      queryFn: async () => {
        try {
          const res = await axiosSecure.get(`/globalReq`);
          return res.data;
        } catch (error) {
          console.error("Error fetching req information:", error);
          throw error;
        }
      },

    });
    const refetch = () => originalRefetch();
    return { globalReq, isLoading, refetch };
};

export default useGlobalReq;