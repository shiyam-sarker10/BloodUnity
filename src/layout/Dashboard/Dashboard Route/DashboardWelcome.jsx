import React from "react";
import useAuth from "../../../hooks/useAuth";
import useUserInfo from "../../../hooks/useUserInfo";
import { Planets, Circle2 } from "react-preloaders";
import useAllReq from "../../../hooks/useAllReq";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const DashboardWelcome = () => {

  const axiosSecure = useAxiosSecure()
  function createData(
    recipientName,
    workStatus,
    hospitalName,
    donationDate,
    district,
    fullAddress,
    edit,
    remove,
    view
  ) {
    return {
      recipientName,
      workStatus,
      hospitalName,
      donationDate,
      district,
      fullAddress,
      edit,
      remove,
      view,
    };
  }

  const rows = [];

  const { user } = useAuth();
  const [UserInfo] = useUserInfo();
  const {AllReq, refetch} = useAllReq();
  console.log(AllReq);

  {
    AllReq?.map((perReq) => {
      const data = createData(
        perReq?.recipientName,
        perReq?.workStatus,
        perReq?.hospitalName,
        perReq?.donationDate,
        perReq?.district,
        perReq?.fullAddress,
        <Link
          to={`/dashboard/editRequest/${perReq?._id}`}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Edit
        </Link>,
        <button
          onClick={() => handleDelete(perReq?._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Remove
        </button>,
        <Link
          to={`/dashboard/view request/${perReq?._id}`}
          className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
        >
          View
        </Link>
      );
      rows.push(data);
      console.log("this is data", data);
    });
  }


 
  const handleDelete = (_id) => {
    if(UserInfo.status === 'blocked'){
        return Swal.fire({
          title: "Request Denied",
          text: "Blocker user cannot make donation request",
          icon: "error"
        })
      }else{


        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            axiosSecure
              .delete(`/allRequest?id=${_id}`)
              .then((response) => {
                console.log(response.data);
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                });
                refetch()
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
        });

        

        }
  };

  return (
    <>
      {user ? (
        <div className=" w-full text-center ">
          <div className="text-2xl md:text-4xl py-12 md:py-8">
            Welcome Back,
            <span className="text-red-600">{UserInfo?.name}</span>
          </div>
          <div className="flex  justify-center ">
            <Grid
              sx={{
                width: "100vw",
              }}
              container
              justifyContent="center"
            >
              <Grid item xs={10} sm={6} md={8} lg={12}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "600", color: "#4B5563" }}>
                          Recipient
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Status
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Hospital
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Donation Date
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          District
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Location
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Edit
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          Remove
                        </TableCell>
                        <TableCell
                          sx={{ fontWeight: "600", color: "#4B5563" }}
                          align="left"
                        >
                          view
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.slice(0, 3).map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.recipientName}
                          </TableCell>
                          <TableCell align="left">
                            <span
                              className={` px-4 py-2 rounded font-semibold text-white  ${
                                row.workStatus === "done"
                                  ? "bg-green-500"
                                  : row.workStatus === "inprogress"
                                  ? "bg-gray-500"
                                  : row.workStatus === "canceled"
                                  ? "bg-red-500"
                                  : row.workStatus === "pending"
                                  ? "bg-amber-500"
                                  : "bg-gray-500"
                              }`}
                            >
                              {row.workStatus}
                            </span>
                          </TableCell>
                          <TableCell align="left">{row.hospitalName}</TableCell>
                          <TableCell align="left">{row.donationDate}</TableCell>
                          <TableCell align="left">{row.district}</TableCell>
                          <TableCell align="left">{row.fullAddress}</TableCell>
                          <TableCell align="left">{row.edit}</TableCell>
                          <TableCell align="left">{row.remove}</TableCell>
                          <TableCell align="left">{row.view}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </div>
          <div className="py-12">
            <Link to="/dashboard/my request">
              <button className="px-4 py-2 rounded-lg bg-[#B61A2B] text-white font-semibold">
                View My All Request
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Planets color={"#EB2C29"} background="#FCF3F3" />
        </div>
      )}
    </>
  );
};

export default DashboardWelcome;
