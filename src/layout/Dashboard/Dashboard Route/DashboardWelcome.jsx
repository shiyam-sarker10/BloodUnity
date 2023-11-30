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
import { useEffect } from "react";
import { useState } from "react";
import useGlobalReq from "../../../hooks/useGlobalReq";
import useAllUsers from "../../../hooks/useAllUsers";

const DashboardWelcome = () => {

  const axiosSecure = useAxiosSecure()
  const [fund,setFund] = useState(0)
  const {globalReq} = useGlobalReq()
  const { AllUsers } = useAllUsers();


  useEffect(() => {
    axiosSecure
      .get("/funds")
      .then((res) => {
        console.log("success fund", res.data);
       const totalFund = res.data.reduce((total, fund) => total + parseInt(fund.fund), 0);
       setFund(totalFund);
      })
      .catch(() => {
        console.log("not success fund");
      });
  }, [axiosSecure]);
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
          {UserInfo?.role === "donor" ? (
            <div>
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
                            <TableCell
                              sx={{ fontWeight: "600", color: "#4B5563" }}
                            >
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
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
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
                              <TableCell align="left">
                                {row.hospitalName}
                              </TableCell>
                              <TableCell align="left">
                                {row.donationDate}
                              </TableCell>
                              <TableCell align="left">{row.district}</TableCell>
                              <TableCell align="left">
                                {row.fullAddress}
                              </TableCell>
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
          ) : UserInfo?.role === "admin" || UserInfo?.role === "volunteer" ? (
            <div className=" md:flex flex-wrap gap-4 my-20">
              <div className="flex md:w-1/4 rounded-md space-y-2 p-5 shadow-lg flex-col text-center mx-auto ">
                <div className=" mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="50"
                    height="50"
                    x="0"
                    y="0"
                    viewBox="0 0 50 50"
                    xmlSpace="preserve"
                    className=""
                  >
                    <g>
                      <path
                        fill="#e7b95e"
                        d="M1.6 21.2v26.1c0 1 .8 1.7 1.7 1.7h43.4c1 0 1.7-.8 1.7-1.7V21.2z"
                        opacity="1"
                        data-original="#e7b95e"
                        className=""
                      ></path>
                      <circle
                        cx="25"
                        cy="37.5"
                        r="8.1"
                        fill="#88c057"
                        opacity="1"
                        data-original="#88c057"
                        className=""
                      ></circle>
                      <path
                        fill="#ffffff"
                        d="M24.7 42.8v-.9c-1.2-.1-2.3-.6-3.2-1.4l.9-1.1c.7.6 1.5 1 2.2 1.1V38c-1-.2-1.7-.5-2.1-.9-.5-.4-.7-.9-.7-1.7 0-.7.3-1.4.8-1.8.5-.5 1.2-.7 2-.8v-.6h.8v.7c1 .1 1.9.4 2.7 1l-.8 1.2c-.6-.4-1.2-.7-1.9-.8v2.4c1 .2 1.7.6 2.2.9.5.4.7 1 .7 1.7 0 .8-.3 1.4-.8 1.9s-1.2.7-2.1.8v.9h-.7zm-.9-8.3c-.2.2-.3.4-.3.7s.1.5.3.7.5.3 1 .5v-2.2c-.5 0-.8.1-1 .3zm2.7 5.7c.2-.2.4-.5.4-.8s-.1-.5-.3-.7-.5-.3-1.1-.5v2.3c.5 0 .8-.1 1-.3z"
                        opacity="1"
                        data-original="#ffffff"
                      ></path>
                      <path
                        fill="#ffcc67"
                        d="m48.4 20.6-1.1-4.8c-.2-.8-.9-1.3-1.6-1.3H4.4c-.8 0-1.5.5-1.6 1.3l-1.1 4.8c-.3 1.1.5 2.1 1.6 2.1h43.5c1-.1 1.8-1.1 1.6-2.1z"
                        opacity="1"
                        data-original="#ffcc67"
                        className=""
                      ></path>
                      <path
                        fill="#676767"
                        d="M34.5 17.7h-19c-.5 0-.9.4-.9.9s.4.9.9.9h19c.5 0 .9-.4.9-.9s-.4-.9-.9-.9z"
                        opacity="1"
                        data-original="#676767"
                        className=""
                      ></path>
                      <path
                        fill="#ed7161"
                        d="M30.8 1c-2.4-.2-4.4 1.1-5.4 3-.9-2-3-3.3-5.4-3-2.9.3-5 2.9-4.9 5.9.3 6.7 5.8 9.9 9.4 11.7.6.3 1.3.3 1.8 0 3.6-1.8 9.1-4.9 9.4-11.7.1-3-2-5.6-4.9-5.9z"
                        opacity="1"
                        data-original="#ed7161"
                        className=""
                      ></path>
                      <path
                        fill="#d66556"
                        d="M33.6 2.2c.9 1.1 1.4 2.5 1.3 4-.3 6.7-5.8 9.9-9.4 11.7-.6.3-1.3.3-1.8 0-1.7-.8-3.8-2-5.6-3.6 1.9 2.1 4.4 3.4 6.3 4.4.6.3 1.3.3 1.8 0 3.6-1.8 9.1-4.9 9.4-11.7.2-2-.6-3.7-2-4.8z"
                        opacity="1"
                        data-original="#d66556"
                        className=""
                      ></path>
                    </g>
                  </svg>
                </div>

                <h5 className="text-2xl font-semibold"> ${fund}</h5>
                <p className="text-gray-400">Total Funding</p>
              </div>
              <div className="flex md:w-1/4 rounded-md space-y-2 p-5 shadow-lg flex-col text-center mx-auto ">
                <div className=" mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="50"
                    height="50"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    className=""
                  >
                    <g>
                      <path
                        d="M371.613 227.096v5.795a66.072 66.072 0 0 0 3.39 20.891l13.126 39.378h24.774v-90.839h-16.516c-13.682.001-24.774 11.092-24.774 24.775z"
                        fill="#5a4146"
                        data-original="#5a4146"
                        className=""
                      ></path>
                      <path
                        d="m484.684 244.251-13.974 48.91-66.065-57.806c-9.122 0-16.516-7.395-16.516-16.516 0-13.682 11.092-24.774 24.774-24.774h57.806c9.122 0 16.516 7.395 16.516 16.516v15.522a66.042 66.042 0 0 1-2.541 18.148z"
                        fill="#694b4b"
                        data-original="#694b4b"
                        className=""
                      ></path>
                      <path
                        d="M404.64 317.94h49.548v36.549H404.64z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M404.645 333.104c7.659 3.112 16.011 4.864 24.774 4.864s17.115-1.752 24.774-4.864v-15.169h-49.548v15.169z"
                        fill="#d29b6e"
                        data-original="#d29b6e"
                        className=""
                      ></path>
                      <path
                        d="m494.031 349.351-39.84-11.382-24.772 16.439-24.774-16.44-39.838 11.383a24.774 24.774 0 0 0-17.968 23.821v60.376a8.258 8.258 0 0 0 8.258 8.258h148.645a8.258 8.258 0 0 0 8.258-8.258v-60.376a24.774 24.774 0 0 0-17.969-23.821z"
                        fill="#d5dced"
                        data-original="#d5dced"
                      ></path>
                      <path
                        d="M437.677 441.805h-16.516l4.129-87.321h8.258z"
                        fill="#afb9d2"
                        data-original="#afb9d2"
                      ></path>
                      <path
                        d="M429.419 326.193c-27.365 0-49.548-22.184-49.548-49.548v-9.675c0-4.38 1.74-8.581 4.837-11.679l14.975-14.975c3.171-3.171 7.507-4.994 11.989-4.853 26.398.833 49.764 6.488 62.537 18.963 3.127 3.054 4.759 7.326 4.759 11.696v10.523c0 27.365-22.184 49.548-49.549 49.548z"
                        fill="#f0c087"
                        data-original="#f0c087"
                      ></path>
                      <path
                        d="M404.645 269.018c0-9.526 8-17.098 17.507-16.492 16.671 1.064 41.409 3.85 56.586 11.15-.495-3.484-1.992-6.773-4.529-9.251-12.773-12.475-36.139-18.13-62.537-18.963l-.001.001v-.001c-4.481-.141-8.818 1.683-11.988 4.853l-14.974 14.974a16.513 16.513 0 0 0-4.838 11.679v9.675c0 22.596 15.141 41.621 35.82 47.579-6.883-8.492-11.045-19.272-11.045-31.063l-.001-24.141z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M478.968 397.779c0-6.571 2.61-12.872 7.256-17.518l21.257-21.257c2.841 4.061 4.519 8.95 4.519 14.169v60.376a8.258 8.258 0 0 1-8.258 8.258h-24.774v-44.028z"
                        fill="#c7cfe2"
                        data-original="#c7cfe2"
                        className=""
                      ></path>
                      <path
                        d="M433.548 371h-8.258a4.13 4.13 0 0 1-4.129-4.129v-12.387h16.516v12.387a4.129 4.129 0 0 1-4.129 4.129z"
                        fill="#959cb5"
                        data-original="#959cb5"
                      ></path>
                      <path
                        d="M429.419 354.409 415.422 365.1a4.955 4.955 0 0 1-7.354-1.558l-12.556-22.93 5.054-7.709a3.303 3.303 0 0 1 5.009-.611l23.844 22.117zM429.419 354.409l13.997 10.692a4.955 4.955 0 0 0 7.354-1.558l12.556-22.93-5.054-7.709a3.303 3.303 0 0 0-5.009-.611l-23.844 22.116z"
                        fill="#c7cfe2"
                        data-original="#c7cfe2"
                        className=""
                      ></path>
                      <path
                        d="M147.822 322.745c-7.057-18.698-12.654-50.841-13.863-67.576-2.3-31.846-26.299-57.806-58.741-57.806s-56.441 25.961-58.741 57.806c-1.209 16.734-6.806 48.878-13.863 67.576-1.555 4.122.24 8.667 4.299 10.507 7.562 3.427 23.685 10.141 43.13 12.756h50.349c19.354-2.621 35.59-9.339 43.13-12.756 4.06-1.84 5.855-6.385 4.3-10.507z"
                        fill="#5a4146"
                        data-original="#5a4146"
                        className=""
                      ></path>
                      <path
                        d="M143.523 333.253c4.058-1.84 5.854-6.385 4.298-10.507-7.056-18.698-12.654-50.841-13.862-67.576-2.299-31.846-26.299-57.806-58.74-57.806l-.245.001c-24.893.101-33.69 34.05-12.261 46.717 1.287.761 2.112 1.127 2.112 1.127l18.769 100.8h16.799c19.354-2.623 35.59-9.34 43.13-12.756z"
                        fill="#694b4b"
                        data-original="#694b4b"
                        className=""
                      ></path>
                      <path
                        d="m134.95 362.588-26.724-13.361a16.516 16.516 0 0 1-9.13-14.774l.002-24.775h-49.55v24.776a16.515 16.515 0 0 1-9.13 14.772l-26.724 13.362A24.771 24.771 0 0 0 0 384.745v48.802a8.258 8.258 0 0 0 8.258 8.258h132.129a8.258 8.258 0 0 0 8.258-8.258v-48.801a24.773 24.773 0 0 0-13.695-22.158z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M74.323 342.709c8.892 0 17.409-1.833 25.217-5.096-.205-1.041-.444-2.076-.444-3.161l.002-24.775h-49.55v24.776c0 1.091-.239 2.131-.446 3.176 7.813 3.246 16.326 5.08 25.221 5.08z"
                        fill="#d29b6e"
                        data-original="#d29b6e"
                        className=""
                      ></path>
                      <path
                        d="m134.95 362.588-19.038-9.519c-8.828 13.632-24.139 22.673-41.589 22.673s-32.762-9.041-41.59-22.674l-19.038 9.52A24.772 24.772 0 0 0 0 384.745v48.802a8.258 8.258 0 0 0 8.258 8.258h132.129a8.258 8.258 0 0 0 8.258-8.258v-48.801a24.773 24.773 0 0 0-13.695-22.158z"
                        fill="#d5dced"
                        data-original="#d5dced"
                      ></path>
                      <path
                        d="M74.323 326.193c-25.192 0-45.992-18.8-49.137-43.135-.456-3.526 1.239-6.983 4.413-8.584 3.802-1.918 9.327-5.152 14.617-9.872 5.891-5.256 9.347-10.799 11.299-14.868 1.681-3.504 5.545-5.486 9.311-4.525 29.076 7.416 48.871 22.543 56.053 28.719 1.928 1.658 3.039 4.103 2.841 6.639-2.001 25.53-23.352 45.626-49.397 45.626z"
                        fill="#f0c087"
                        data-original="#f0c087"
                      ></path>
                      <path
                        d="M120.878 273.927c-7.181-6.176-26.977-21.303-56.053-28.719-3.766-.961-7.63 1.021-9.311 4.525-1.478 3.082-3.921 7.008-7.546 11.016l-.005.028c-1.125 1.275-2.323 2.553-3.747 3.825-5.29 4.721-10.815 7.954-14.617 9.872-3.174 1.601-4.868 5.059-4.413 8.585 2.825 21.855 19.927 39.251 41.625 42.569-9.887-6.726-17.262-15.976-17.262-32.466v-11.776c1.876-1.385 3.765-2.766 5.663-4.46a65.745 65.745 0 0 0 11.81-13.933c22.243 6.941 37.323 18.502 43.04 23.418 1.565 1.372 5.449 4.952 9.993 9.215 1.955-4.705 3.248-9.753 3.663-15.058.199-2.537-.912-4.982-2.84-6.641z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M5.034 369.859C1.853 374.081 0 379.26 0 384.745v48.802a8.258 8.258 0 0 0 8.258 8.258h24.774v-41.61c0-5.017-2.281-9.763-6.199-12.897L5.034 369.859z"
                        fill="#c7cfe2"
                        data-original="#c7cfe2"
                        className=""
                      ></path>
                      <path
                        d="m374.643 351.318-69.095-25.126L256 342.709l-49.548-16.516-69.095 25.126a33.032 33.032 0 0 0-21.744 31.043v51.186a8.258 8.258 0 0 0 8.258 8.258h264.258a8.258 8.258 0 0 0 8.258-8.258v-51.186a33.031 33.031 0 0 0-21.744-31.044z"
                        fill="#ff507d"
                        data-original="#ff507d"
                        className=""
                      ></path>
                      <path
                        d="m247.349 359.226-7.865 82.579h33.032l-7.865-82.579z"
                        fill="#707487"
                        data-original="#707487"
                      ></path>
                      <path
                        d="M264.67 370.571h-17.34a5.78 5.78 0 0 1-5.781-5.781v-22.081h28.901v22.081a5.78 5.78 0 0 1-5.78 5.781z"
                        fill="#5b5d6e"
                        data-original="#5b5d6e"
                      ></path>
                      <path
                        d="M387.498 359.855c5.576 5.985 8.889 13.956 8.889 22.506v51.186a8.258 8.258 0 0 1-8.258 8.258h-41.29v-27.608c0-8.761 3.48-17.163 9.675-23.357l30.984-30.985z"
                        fill="#d23c69"
                        data-original="#d23c69"
                        className=""
                      ></path>
                      <path
                        d="M346.839 155.889v-69.18c0-9.122-7.395-16.516-16.516-16.516h-99.097c-36.486 0-66.065 29.578-66.065 66.065v19.631a82.572 82.572 0 0 0 4.238 26.114l2.749 8.247a24.772 24.772 0 0 1 1.271 7.834v4.238H338.58v-4.238c0-2.663.429-5.308 1.271-7.834l2.749-8.247a82.553 82.553 0 0 0 4.239-26.114z"
                        fill="#5a4146"
                        data-original="#5a4146"
                        className=""
                      ></path>
                      <path
                        d="M206.452 103.741c0 18.528 15.02 33.548 33.548 33.548h4.645l2.242 65.032h91.693v-4.238c0-2.663.429-5.308 1.271-7.834l2.749-8.247a82.572 82.572 0 0 0 4.238-26.114V86.709c0-9.122-7.395-16.516-16.516-16.516H240c-18.528 0-33.548 15.02-33.548 33.548z"
                        fill="#694b4b"
                        data-original="#694b4b"
                        className=""
                      ></path>
                      <path
                        d="M206.45 268.39h99.1v74.32h-99.1z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M206.452 296.31c14.588 8.451 31.477 13.366 49.548 13.366s34.961-4.915 49.548-13.366v-27.924h-99.097l.001 27.924z"
                        fill="#d29b6e"
                        data-original="#d29b6e"
                        className=""
                      ></path>
                      <path
                        d="m256 342.709-26.338 26.338c-3.54 3.54-9.391 3.141-12.417-.847l-27.309-35.984 7.143-15.053c2.108-4.442 7.606-6.07 11.792-3.49L256 342.709zM256 342.709l26.338 26.338c3.54 3.54 9.391 3.141 12.417-.847l27.309-35.984-7.143-15.053c-2.108-4.442-7.606-6.07-11.792-3.49L256 342.709z"
                        fill="#d23c69"
                        data-original="#d23c69"
                        className=""
                      ></path>
                      <path
                        d="M256 293.161c-45.608 0-82.581-36.973-82.581-82.581v-9.675c0-4.38 1.74-8.581 4.837-11.679l6.841-6.841a16.516 16.516 0 0 0 4.837-11.679V150.91c0-3.824 2.568-7.146 6.289-8.025 19.531-4.613 80.308-15.54 121.669 14.88 2.686 1.975 4.171 5.22 4.171 8.554v4.387c0 4.38 1.74 8.581 4.837 11.679l6.841 6.841a16.516 16.516 0 0 1 4.837 11.679v9.675c.003 45.608-36.97 82.581-82.578 82.581z"
                        fill="#f0c087"
                        data-original="#f0c087"
                      ></path>
                      <path
                        d="M317.893 157.766c-29.09-21.395-67.731-22.321-94.925-19.392-11.471 1.235-20.949 3.144-26.743 4.512-3.721.879-6.289 4.201-6.289 8.025v19.795c0 4.381-1.74 8.582-4.838 11.68l-6.841 6.841a16.517 16.517 0 0 0-4.838 11.68v9.674c0 42.224 31.71 76.985 72.602 81.92-14.249-14.839-23.054-34.948-23.054-57.146v-60.361c0-8.369 6.223-15.363 14.526-16.404 19.818-2.485 56.116-3.979 84.57 12.118v-4.388c.002-3.334-1.486-6.58-4.17-8.554z"
                        fill="#e6af78"
                        data-original="#e6af78"
                        className=""
                      ></path>
                      <path
                        d="M124.502 359.855c-5.576 5.985-8.889 13.956-8.889 22.506v51.186a8.258 8.258 0 0 0 8.258 8.258h41.29v-27.608c0-8.761-3.48-17.163-9.675-23.357l-30.984-30.985z"
                        fill="#d23c69"
                        data-original="#d23c69"
                        className=""
                      ></path>
                    </g>
                  </svg>
                </div>

                <h5 className="text-2xl font-semibold">{AllUsers?.length}</h5>
                <p className="text-gray-400">Total Users</p>
              </div>
              <div className="flex md:w-1/4 rounded-md space-y-2 p-5 shadow-lg flex-col text-center mx-auto ">
                <div className=" mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="50"
                    height="50"
                    x="0"
                    y="0"
                    viewBox="0 0 512 512.001"
                    xmlSpace="preserve"
                    className=""
                  >
                    <g>
                      <g fill="#f44545">
                        <path
                          d="M363.371 453.32c-24.957 36.79-65.746 59.551-114.457 58.657-102.988-2.325-164.77-115.762-112.644-204.618l100.078-170.582c4.832-8.254 14.472-10.922 22.414-8.015 3.812 1.386 7.23 4.054 9.554 8.015L368.395 307.36c28.582 48.715 22.914 104.829-5.024 145.961zM496.328 154.668c-11.433 26.285-36.793 44.422-68.941 43.629-55.063-1.719-87.742-62.5-59.867-110.02L413.94 9.145c4.836-8.243 14.477-10.922 22.414-8.004 3.817 1.375 7.243 4.043 9.56 8.004l46.42 79.132c12.704 21.653 12.83 46.07 3.993 66.391zM124.398 232.8c-8.976 24.134-31.488 42.005-60.148 42.005-50.367 0-80.234-54.899-55.27-97.453l41.11-70.079c4.629-7.886 14.183-10.023 21.476-6.406 2.72 1.332 5.118 3.48 6.836 6.406l41.11 70.079c10.566 18.007 11.304 38.16 4.886 55.449zm0 0"
                          fill="#f44545"
                          opacity="1"
                          data-original="#f44545"
                          className=""
                        ></path>
                      </g>
                      <path
                        fill="#fb5858"
                        d="M363.371 453.32c-19.164 11.825-41.848 19.004-66.98 19.578-106.38 2.93-173-113.386-119.485-204.617l81.856-139.52c3.812 1.387 7.23 4.055 9.554 8.016L368.395 307.36c28.582 48.715 22.914 104.829-5.024 145.961zM496.328 154.668c-7.148 2.7-14.933 4.293-23.23 4.55-.832.024-1.688.044-2.532.044-.855 0-1.699-.02-2.543-.043-55.058-1.719-87.75-62.5-59.863-110.008l28.195-48.07c3.817 1.375 7.243 4.043 9.56 8.004l46.42 79.132c12.704 21.653 12.83 46.07 3.993 66.391zM124.398 232.8c-5.398 1.7-11.18 2.708-17.265 2.895a71.285 71.285 0 0 1-4.492 0c-48.758-1.52-77.707-55.34-53.02-97.418l21.945-37.41c2.72 1.332 5.118 3.48 6.836 6.406l41.11 70.079c10.566 18.007 11.304 38.16 4.886 55.449zm0 0"
                        opacity="1"
                        data-original="#fb5858"
                        className=""
                      ></path>
                    </g>
                  </svg>
                </div>

                <h5 className="text-2xl font-semibold"> {globalReq?.length}</h5>
                <p className="text-gray-400">Total Donation Request</p>
              </div>
            </div>
          ) : (
            ""
          )}
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
