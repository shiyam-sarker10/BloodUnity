import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

import {useState, useEffect } from "react";
import React from "react";

import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
} from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import { Planets, Circle2 } from "react-preloaders";


const DashboardProfile = () => {
  const axiosPublic = useAxiosPublic();
  const { user, UserUpdate } = useAuth();
  const [userInfo, setUserInfo] = useState([]);



  // image hosting  on image bb image api and key

   const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

   const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


  const [Blood, setBlood] = React.useState("");
  const [District, setDistrict] = React.useState("");

  // for districts select
  const [Districts, setDistricts] = useState([]);

  // for upazila select
  const [upazila, setUpazila] = React.useState("");
  const [upazilas, setUpazilas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../../../public/upazilas.json");
        const data = await response.json();
        setUpazilas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("../../../../public/districts.json");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



//   userINfo fetching 
  const [UserInfo, refetch, isLoading] = useUserInfo();

  const [showImage,setShowImage] = useState({})
 



  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const image = e.target.image.files[0];
    console.log(image)
    setShowImage(image);
    const upaZila = upazila;
    const disTrict = District;
    const BloodGroup = Blood;
    const imageFile = { image: image };

    const imageRes = await axios.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = imageRes.data.data.display_url;

    const Info = {
      name,
      imageUrl,
      upazila: upaZila,
      district: disTrict,
      BloodGroup,
    };
    console.log(userInfo)

    UserUpdate(name, imageUrl)
    .then((result) => {
        console.log("result",result)
      axiosPublic.put(`/allUsers?email=${user?.email}`, Info).then((res) => {
        if (res.data.modifiedCount) {
          refetch()
          toast.success("upadted successfull");
        }
      });
    });
  };

  return (
    <div>
      <h1 className=" text-3xl text-center">
        Your <span className="text-red-600">Profile</span>
      </h1>
      {user ? (
        <div className=" lg:flex h-[80vh] px-4 md:px-8 items-center justify-between  ">
          {isLoading ? (
            <div className="flex justify-center">
              <Box sx={{ width: 300 }}>
                <Skeleton
                  sx={{ mx: "auto", py: "8px" }}
                  variant="circular"
                  width={140}
                  height={140}
                />
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton animation={false} />
              </Box>
            </div>
          ) : (
            <div className="flex flex-col py-10 md:py-0  justify-center items-center lg:w-[40%] ">
              <div className=" py-8">
                <img
                  className="w-[150px] h-[150px] rounded-full object-cover "
                  src={UserInfo?.imageUrl}
                  alt="image"
                />
              </div>
              <div className="flex flex-col md:grid md:grid-cols-2 gap-4 ">
                <p className=" text-lg w-max">
                  Name :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.name}
                  </span>
                </p>
                <p className=" text-lg w-max">
                  Email :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.email}
                  </span>
                </p>
                <p className=" text-lg w-max">
                  Role :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.role}
                  </span>
                </p>
                <p className=" text-lg w-max">
                  BloodGroup :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.BloodGroup}
                  </span>
                </p>
                <p className=" text-lg w-max">
                  Upazila :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.upazila}
                  </span>
                </p>
                <p className=" text-lg w-max">
                  District :{" "}
                  <span className="text-gray-500 text-base">
                    {UserInfo?.district}
                  </span>
                </p>
              </div>
            </div>
          )}

          <div className="lg:border-l-4 border-red-400 px-8 lg:w-[50%] ">
            {" "}
            <form onSubmit={handleUpdate}>
              <div className="flex w-64 mx-auto py-8 overflow-hidden  items-center justify-center bg-grey-lighter">
                <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-600">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal">
                    {showImage?.name ? showImage?.name : "select a file"}
                  </span>
                  <input type="file" className="hidden" name="image" />
                </label>
              </div>
              <div className=" flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-8 ">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  name="name"
                />

                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Upazila</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={upazila}
                    label="upazila"
                    onChange={(event) => setUpazila(event.target.value)}
                  >
                    {upazilas?.map((upzila) => (
                      <MenuItem key={upzila.id} value={`${upzila.name}`}>
                        {upzila.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">District</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={District}
                    label="District"
                    onChange={(event) => setDistrict(event.target.value)}
                  >
                    {Districts?.map((district) => (
                      <MenuItem key={district.id} value={`${district.name}`}>
                        {district.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Blood</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={Blood}
                    label="Blood"
                    onChange={(event) => setBlood(event.target.value)}
                  >
                    <MenuItem value={"A+"}>A+</MenuItem>
                    <MenuItem value={"A-"}>A-</MenuItem>
                    <MenuItem value={"B+"}>B+</MenuItem>
                    <MenuItem value={"B-"}>B-</MenuItem>
                    <MenuItem value={"AB+"}>AB+</MenuItem>
                    <MenuItem value={"AB-"}>AB-</MenuItem>
                    <MenuItem value={"O+"}>O+</MenuItem>
                    <MenuItem value={"O-"}>O-</MenuItem>
                  </Select>
                </FormControl>
                <input
                  className="col-span-2 py-2 bg-[#C91C1C] rounded-md text-[#f2f2f2]"
                  type="submit"
                  value="Update Profile"
                />
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div>
          <Planets color={"#EB2C29"} background="#FCF3F3" />
        </div>
      )}
    </div>
  );
};

export default DashboardProfile;
