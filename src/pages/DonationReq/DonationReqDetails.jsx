import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAllReq from '../../hooks/useAllReq';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const DonationReqDetails = () => {

    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxiosSecure()
const [allPendingReq, setAllPendingReq] = useState([]);

    useEffect(() => {
      axiosPublic
        .get(`/allPendingReq?workStatus=pending`)
        .then((res) => setAllPendingReq(res.data));
    }, []);

    const { refetch } = useAllReq();
    const { id } = useParams();
    const filterData = allPendingReq?.find((item) => item?._id == id);
    console.log(filterData, id);
    const donateNavigate = useNavigate()


    // handleDelete 

    const handleDonate = (_id) => {


        axiosSecure.patch(`/allReqDonate?id=${_id}`,{workStatus:'inprogress'})
        .then(()=>{
            Swal.fire({
              title: "Donation Successful",
              text: "Thank You for your great Deed",
              icon: "success",
            });
            donateNavigate("/Donation Requests");
            
        })
        .catch('not success')
    }
    return (
      <div>
        <div className="w-[70%] mx-auto  relative ">
          <div className=" bg-white z-20 border-y-2 shadow-md border-red-600  relative p-8     mx-auto my-8">
            <h2 className="text-2xl font-semibold mb-4">
              Donation Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Name:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.name}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Email:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.email}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">District:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.district}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Upazila:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.upazila}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Donation Time:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.donationTime}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Donation Date:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.donationDate}
                </span>
              </div>
              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Hospital Name:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.hospitalName}
                </span>
              </div>

              <div className="space-y-2 flex flex-col">
                <span className="font-semibold  mb-1">Recipient Name:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.recipientName}
                </span>
              </div>
              <div className="col-span-1  flex flex-col">
                <span className="font-semibold  mb-1">Work Status:</span>
                <span
                  className={` px-4 py-2 rounded font-semibold text-white  ${
                    filterData?.workStatus === "done"
                      ? "bg-green-500/70"
                      : filterData?.workStatus === "inprogress"
                      ? "bg-gray-500/70"
                      : filterData?.workStatus === "canceled"
                      ? "bg-red-500/70"
                      : filterData?.workStatus === "pending"
                      ? "bg-amber-500/70"
                      : "bg-gray-500/70"
                  }`}
                >
                  {filterData?.workStatus}
                </span>
              </div>

              <div className="space-y-2 col-span-3 flex flex-col">
                <span className="font-semibold  mb-1">Full Address:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.fullAddress}
                </span>
              </div>
              <div className="space-y-2 col-span-3 flex flex-col">
                <span className="font-semibold  mb-1">Message:</span>
                <span className="bg-gray-200 px-4 py-2 text-gray-700 font-semibold rounded-lg my-2">
                  {filterData?.message}
                </span>
              </div>
              <div className="text-center col-span-3">
                <button
                  onClick={() => handleDonate(filterData?._id)}
                  className={` ${
                    filterData
                      ? "bg-[#EB2C29]"
                      : "bg-gray-200 w-max mx-auto text-gray-200"
                  } py-2 px-8 rounded-lg text-white font-semibold`}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DonationReqDetails;