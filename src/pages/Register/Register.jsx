import React, { useContext, useEffect } from "react";
import { Donor } from "../../Lottie/LottieImg";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import useAxiosPublic from "./../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { Bloodtype } from "@mui/icons-material";


const Register = () => {
  const axiosPublic = useAxiosPublic();

  //  use navigation

  const loginNavigate = useNavigate();
  const navigate = useNavigate();

  // authProvider
  const { createUser, UserUpdate, LogOut } = useContext(AuthContext);

  // image hosting  on image bb image api and key

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
        const response = await fetch("./upazilas.json");
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
        const response = await fetch("./districts.json");
        const data = await response.json();
        setDistricts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const name = e.target.name.value;
    const confirmPassword = e.target.confirmPassword.value;
    const password = e.target.password.value;
    const image = e.target.image.files[0];
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

    const userInfo = {
      name,
      email,
      imageUrl,
      upazila: upaZila,
      district: disTrict,
      BloodGroup,
      role: "donor",
      status: "active",
    };

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain 1 capital letter ");
      return;
    } else if (!specialChars.test(password)) {
      toast.error("Password must contain 1 spacial  character ");
      return;
    } else if (confirmPassword != password) {
      toast.error("Password must be match with Confirm Password");
    } else {
      createUser(email, password)
        .then((result) => {
          console.log(result);
          toast.success("SuccessFully registered");
          UserUpdate(name, imageUrl).then((result) => {
            axiosPublic
              .post("/allUsers", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User created successfully.",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              })
            loginNavigate("/login");
          });
          LogOut()
            .then((result) => {})
            .catch((error) => {});
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div className="hero min-h-screen bg-[#C91C1C]/5 p-10 lg:p-0">
      <div className="flex flex-col-reverse md:flex-row justify-center items-center">
        <div className="hidden md:block text-center lg:text-left flex-1">
          <Donor></Donor>
        </div>
        <div className="  w-full shadow-2xl border-4 border-[#FAE7E7] bg-white/80 space-y-10 rounded-lg backdrop-blur-lg p-10 flex-1">
          <h3 className="text-4xl font-semibold text-center py-5">
            Register{" "}
            <span className="text-[#C91C1C]">
              Form <Bloodtype sx={{ mr: 1, fontSize: "40px" }} />
            </span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-8 ">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                size="small"
                name="name"
              />
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                size="small"
                name="email"
              />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                size="small"
                name="password"
                type="password"
              />
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                size="small"
                name="confirmPassword"
                type="password"
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
                <InputLabel id="demo-select-small-label">
                  Blood 
                </InputLabel>
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
                name="image"
                type="file"
                className="file-input  file:text-white  text-black file-input-bordered file:border-red-500 file:bg-red-700 w-full max-w-xs"
              />
              <div>
                <p>
                  {" "}
                  Already have an account ?{" "}
                  <a
                    href="/login"
                    className="text-red-700 font-semibold border-b-2 border-red-700"
                  >
                    Login
                  </a>
                </p>
              </div>
              <input
                className="col-span-2 py-2 bg-[#C91C1C] rounded-md text-[#f2f2f2]"
                type="submit"
                value="Register"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
