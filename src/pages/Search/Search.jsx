import { useEffect } from 'react';
import { useState } from 'react';
import useAxiosPublic from './../../hooks/useAxiosPublic';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material/styles";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ContactsIcon from "@mui/icons-material/Contacts";
import { MdBloodtype } from "react-icons/md";
const Search = () => {
  const theme = useTheme();


  // for upazila select

  const [upazila, setUpazila] = useState("");
  const [upazilas, setUpazilas] = useState([]);

   const [Districts, setDistricts] = useState([]); 
  const [District, setDistrict] = useState("");
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
  


  const [blood, setBlood] = useState('');



  // axios hook 

  const axiosPublic = useAxiosPublic()


//   handle Submit 

const [searchData,setSearchData] = useState()
const handleSubmit = async (e) => {


  e.preventDefault()
  const yourUpazila = upazila;
  const yourDistrict = District;
  const BloodGroup = blood;
  const filterOBJ = {  yourUpazila, yourDistrict, BloodGroup };
  console.log(filterOBJ);
  const encodedBloodGroup = encodeURIComponent(`${BloodGroup}`);
  try {
  const response = await axiosPublic.get(
    `/searchUser?upazila=${yourUpazila}&district=${yourDistrict}&bloodGroup=${encodedBloodGroup}`
  );
  setSearchData(response.data);
  console.log('Search success:', response.data);
} catch (error) {
  console.error('Error during search:', error);
}



}
  return (
    <div className="text-center py-2  my-[62.5px]">
      <div className="text-3xl font-bold w-1/5 mx-auto  my-6">
        Search <span className="text-red-600">Donors</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="join">
          <select
            className="select select-bordered join-item"
            onChange={(event) => setDistrict(event.target.value)}
            value={District}
            placeholder='District'
          >
            {Districts?.map((item, idx) => (
              <option key={idx} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered join-item"
            onChange={(event) => setBlood(event.target.value)}
            value={blood}
          >
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O-</option>
            <option value="O-">O-</option>
          </select>
          <select
            className="select select-bordered join-item"
            onChange={(event) => setUpazila(event.target.value)}
            value={upazila}
          >
            {upazilas?.map((item, idx) => (
              <option key={idx} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <input
            type="submit"
            value="Search"
            className="btn join-item bg-red-600 text-white hover:bg-red-500"
          />
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 p-8 justify-center items-center gap-8">
        {searchData?.map((data) => (
          <Card
            key={data.email}
            sx={{ display: "flex", flexDirection: "row-reverse", gap: "1rem" }}
          >
            <Box
              sx={{
                display: "flex",
                width: "75%",
                justifyContent: "start",
                textAlign: "left",
              }}
            >
              <CardContent>
                <Typography component="div" variant="h6" sx={{ mb: "10px" }}>
                  <span className="flex items-center">
                    {" "}
                    <ContactsIcon sx={{ mr: 1, fontSize: "25px" }} />{" "}
                   Name : {data?.name}
                  </span>
                </Typography>

                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                  sx={{ mb: "10px" }}
                >
                  <span className="flex items-center">
                    <MarkEmailReadIcon
                      sx={{ mr: 1, fontSize: "20px", color: "text.secondary" }}
                    />{" "}
                    Email : {data?.email}
                  </span>
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  <span className="flex items-center">
                    {" "}
                    <MdBloodtype className="text-[20px] mr-[8px] text-[text.secondary]" />
                    Blood Group : {data?.BloodGroup}
                  </span>
                </Typography>
              </CardContent>
            </Box>
            <CardMedia
              component="img"
              sx={{ width: "250px", height: 155 }}
              image={data?.imageUrl}
              alt="Live from space album cover"
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Search;