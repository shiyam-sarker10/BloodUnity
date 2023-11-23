import React from "react";
import { Donor } from "../../Lottie/LottieImg";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  
} from "@mui/material";


const Register = () => {
  const [Blood, setBlood] = React.useState("");
  const [District, setDistrict] = React.useState("");

  const handleBloodChange = (event) => {
    setBlood(event.target.value);
    
  };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
    
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    console.log("this is eami and name", email, name);
  };
  return (
    <div className="hero min-h-screen bg-[#C91C1C]/10">
      <div className="flex flex-col lg:flex-row justify-center items-center">
        <div className="text-center lg:text-left flex-1">
          <Donor></Donor>
        </div>
        <div className="  w-full shadow-2xl bg-white/80 space-y-10 rounded-lg backdrop-blur-lg p-10 flex-1">
          <h3 className="text-4xl font-semibold text-center py-5">
            Register <span className="text-[#C91C1C]">Form</span>
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
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
              />
              <TextField
                id="outlined-basic"
                label="zila"
                variant="outlined"
                size="small"
              />
              <TextField
                id="outlined-basic"
                label="zila"
                variant="outlined"
                size="small"
              />

              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">District</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={District}
                  label="District"
                  onChange={handleDistrictChange}
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
              <FormControl sx={{ minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Blood</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={Blood}
                  label="Blood"
                  onChange={handleBloodChange}
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
                type="file"
                className="file-input text-white file-input-bordered file:border-red-500 file:bg-red-700 w-full max-w-xs"
              />
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
