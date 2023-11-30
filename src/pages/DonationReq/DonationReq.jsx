import  { useEffect, useState } from "react";



import { Link } from "react-router-dom";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useUserInfo from "../../hooks/useUserInfo";
import useAxiosSecure from "../../hooks/useAxiosSecure";



const DonationReq = () => {
  
  function createData(
    name,
    workStatus,
    donationDate,
    donationTime,
    fullAddress,
    view
  ) {
    return {
      name,
      workStatus,
      donationDate,
      donationTime,
      fullAddress,
      view,
    };
  }


  const axiosPublic = useAxiosSecure()

 



  const { user } = useAuth();
  const [UserInfo] = useUserInfo();
  useEffect(() =>{
    axiosPublic
      .get(`/allPendingReq?workStatus=pending`)
      .then((res) => setAllPendingReq(res.data));

  },[])
    const [allPendingReq, setAllPendingReq] = useState([]);
  console.log(allPendingReq);





  return (
    <>
      
        <div className=" w-full text-center  my-[62.5px]">
          <div className="text-2xl md:text-4xl py-12 md:py-8">
            Welcome Back,
            <span className="text-red-600">{UserInfo?.name}</span>
          </div>
         
          <div className="overflow-x-auto w-[70%] border shadow-md mx-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="text-gray-700  text-[14px] font-bold">
                    Requester
                  </th>
                  <th className="text-gray-700  text-[14px] font-bold">
                    Status
                  </th>
                  <th className="text-gray-700  text-[14px] font-bold">
                    Donation Date
                  </th>
                  <th className="text-gray-700  text-[14px] font-bold">
                    Donation Time
                  </th>
                  <th className="text-gray-700  text-[14px] font-bold">
                    Location
                  </th>
                  <th className="text-gray-700  text-[14px] font-bold">View</th>
                </tr>
              </thead>

              <tbody>
                {allPendingReq?.map((row, idx) => (
                  <tr key={idx}>
                    <th>{idx + 1}</th>
                    <td className="py-6">{row?.name}</td>
                    <td className="py-6">
                      <span
                        className={` px-4 py-2 rounded font-semibold text-white  ${
                          row?.workStatus === "done"
                            ? "bg-green-500"
                            : row?.workStatus === "inprogress"
                            ? "bg-gray-500"
                            : row?.workStatus === "canceled"
                            ? "bg-red-500"
                            : row?.workStatus === "pending"
                            ? "bg-amber-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {row?.workStatus}
                      </span>
                    </td>
                    <td className="py-6">{row?.donationDate}</td>
                    <td className="py-6">
                      {row?.donationTime} {row?.donationTime > 12 ? "PM" : "AM"}
                    </td>
                    <td className="py-6">{row?.fullAddress}</td>
                    <td className="py-6">
                      <Link
                        to={`/donationReq details/${row?._id}`}
                        className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
       
    </>
  );
};

export default DonationReq;
