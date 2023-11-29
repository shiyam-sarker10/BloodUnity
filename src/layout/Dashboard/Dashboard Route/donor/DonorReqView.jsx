import React from 'react';
import useAllReq from '../../../../hooks/useAllReq';
import { useParams } from 'react-router-dom';
import useGlobalReq from '../../../../hooks/useGlobalReq';

const DonorReqView = () => {
    const {globalReq} = useGlobalReq()
    const {id} = useParams()
    const filterData = globalReq?.filter((item) => item._id == id);
    console.log(filterData, id);

    return (
      <div>
        <div className="bg-gradient-to-tl text-white from-[#9c102c] to-[#EB2C29] p-8 shadow-md border border-gray-300 rounded-md  mx-auto my-8">
          <h2 className="text-2xl font-semibold mb-4">Donation Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            <div>
              <span className="font-semibold block mb-1">Name:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.name}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Email:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.email}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">District:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.district}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Upazila:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.upazila}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Donation Time:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.donationTime}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Donation Date:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.donationDate}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Hospital Name:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.hospitalName}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Recipient Name:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.recipientName}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Message:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.message}
              </span>
            </div>
            <div>
              <span className="font-semibold block mb-1">Full Address:</span>
              <span className="bg-red-200 px-4 py-2 text-red-700 font-semibold rounded-lg my-2">
                {filterData[0]?.fullAddress}
              </span>
            </div>
            <div className="col-span-2">
              <span className="font-semibold block mb-1">Work Status:</span>
              <span
                className={` px-4 py-2 rounded font-semibold text-white  ${
                  filterData[0]?.workStatus === "done"
                    ? "bg-green-500/70"
                    : filterData[0]?.workStatus === "inprogress"
                    ? "bg-gray-500/70"
                    : filterData[0]?.workStatus === "canceled"
                    ? "bg-red-500/70"
                    : filterData[0]?.workStatus === "pending"
                    ? "bg-amber-500/70"
                    : "bg-gray-500/70"
                }`}
              >
                {filterData[0]?.workStatus}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
};

export default DonorReqView;