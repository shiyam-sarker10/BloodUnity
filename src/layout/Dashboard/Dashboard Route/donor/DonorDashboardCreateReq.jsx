import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useUserInfo from '../../../../hooks/useUserInfo';



 

const DonorDashboardCreateReq = () => {

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

     const handleSubmit = (e) => {};


    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col md:grid grid-cols-1 md:grid-cols-2 gap-8 ">
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
            <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                {" "}
                Recipient Upazila
              </InputLabel>
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

            <FormControl variant="standard" sx={{ minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">
                {" "}
                Recipient District
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
            

            <input
              className="col-span-2 py-2 bg-[#C91C1C] rounded-md text-[#f2f2f2]"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </div>
    );
};

export default DonorDashboardCreateReq;