import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useUserInfo from '../../../../hooks/useUserInfo';
import "react-time-picker/dist/TimePicker.css";
import TimePicker from "react-time-picker";
import "react-clock/dist/Clock.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../../../hooks/useAuth';
import Swal from 'sweetalert2';
import moment from 'moment/moment';
import { Planets } from "react-preloaders";
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAllReq from '../../../../hooks/useAllReq';
import { useParams } from 'react-router-dom';







 

const DonorEditReq = () => {
    const {id} = useParams()

    const axiosSecure = useAxiosSecure()
   
  //  authProvider user 
    const {user} = useAuth()

    const {AllReq} = useAllReq();

    const singleReq = AllReq?.filter((item) => item._id == id)
    console.log(singleReq[0])

    // hook 

    const [UserInfo] = useUserInfo()
    
     const [District, setDistrict] = React.useState("");

     // for districts select
     const [Districts, setDistricts] = useState([]);

     // for upazila select
     const [upazila, setUpazila] = React.useState("");
     const [upazilas, setUpazilas] = useState([]);

     useEffect(() => {
       const fetchData = async () => {
         try {
           const response = await fetch("../../../../../public/upazilas.json");
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
           const response = await fetch("../../../../../public/districts.json");
           const data = await response.json();
           setDistricts(data);
         } catch (error) {
           console.error("Error fetching data:", error);
         }
       };

       fetchData();
     }, []);
     
    //  react time and date picker states 
    //  const [TimeValue, onChangeTimeValue] = useState("10:00");
     
     const [startDate, setStartDate] = useState(new Date());
     const donationDatetime = moment(startDate).format("LT");
     const [value, onChange] = useState(donationDatetime.split(" ")[0]);

     
     


     const handleSubmit = (e) => {
      e.preventDefault()


      const disTrict = District;
      const Upazilaa = upazila;
      const donationTime = value;
      const donationDate = moment(startDate).format("MMM Do YY"); 
    
      const hospitalName = e.target.hospitalName.value;
      const recipientName = e.target.recipientName.value;
      const fullAddress = e.target.fullAddress.value;
      const requestInfo = {
        district: disTrict,
        upazila: Upazilaa,
        donationTime,
        donationDate,
        hospitalName,
        recipientName,
        fullAddress,
        workStatus: "pending",
      };
      if(UserInfo.status === 'blocked'){
        return Swal.fire({
          title: "Request Denied",
          text: "Blocker user cannot make donation request",
          icon: "error"
        })
      }else{


        console.log(requestInfo);

        axiosSecure
          .put(`/allRequest?id=${singleReq[0]._id}`, requestInfo)
          .then((response) => {
            console.log(response.data);
            Swal.fire({
              title: "Good job!",
              text: "You clicked the button!",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error sending PUT request:", error);
            Swal.fire({
              title: "Oops!",
              text: "Something went wrong while processing your request.",
              icon: "error",
            });
          });

}     
      

     };


    return (
      <div className=" mb-20">
        {user ? (
          <div>
            <div>
              <h2 className="text-3xl md:text-4xl  text-center pb-12">
                Update Donation <span className="text-red-600">Request</span>
              </h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className=" w-[80%] mx-auto flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-6 ">
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  size="small"
                  name="name"
                  defaultValue={UserInfo?.name}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  size="small"
                  name="email"
                  defaultValue={UserInfo?.email}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Recipient Name"
                  variant="outlined"
                  size="small"
                  name="recipientName"
                />
                <TextField
                  id="outlined-basic"
                  label="Hospital Name"
                  variant="outlined"
                  size="small"
                  name="hospitalName"
                />
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label"> Upazila</InputLabel>
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
                  <InputLabel id="demo-select-small-label">
                    {" "}
                    District
                  </InputLabel>
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

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                  <div className=" w-full lg:w-1/2">
                    <p>Donation Time </p>
                    <TimePicker
                      className={`w-full`}
                      onChange={onChange}
                      value={value}
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <p>Donation Time </p>
                    <div className="border border-[#808080] w-full py-[2px]  ">
                      <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>
                </div>
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  label="Full Address"
                  name="fullAddress"
                />

                <input
                  className="col-span-2 py-2 mb-8 bg-[#C91C1C] rounded-md text-[#f2f2f2]"
                  type="submit"
                  value="Request"
                />
              </div>
            </form>
          </div>
        ) : (
          <div>
            <Planets color={"#EB2C29"} background="#FCF3F3" />
          </div>
        )}
      </div>
    );
};

export default DonorEditReq;