import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { RiLockUnlockFill, RiAdminFill, RiTeamLine } from "react-icons/ri";
import { MdBlock } from "react-icons/md";
import useAllUsers from "../../../../hooks/useAllUsers";


const columns = [
  { id: "image", label: "Avatar", minWidth: 100 },
  {
    id: "name",
    label: "Name",
    minWidth: 100,
    align: "center",
  },
  {
    id: "email",
    label: "Email",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "block",
    label: "Block",
    minWidth: 100,
    align: "center",
  },

  {
    id: "unBlock",
    label: "Unblock",
    minWidth: 100,
    align: "center",
  },
  {
    id: "makeAdmin",
    label: "Make admin",
    minWidth: 80,
    align: "center",
  },
  {
    id: "makeVolunteer",
    label: "Make volunteer",
    minWidth: 80,
    align: "center",
  },
];

export default function AdminAllUsers() {

  const {AllUsers,refetch} = useAllUsers()



  const axiosSecure = useAxiosSecure();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleBlock = (_id) =>{
    axiosSecure
      .patch(`/allUsers?id=${_id}`, { status: "block" })
      .then(() => {
        console.log("success block");
        Swal.fire({
          title: "Great job!",
          text: `Block Successful`,
          icon: "success",
        });
        refetch();
      })
      .catch(() => {
        console.log("error block");
      });
    
  }
  const handleUnBlock = (_id) =>{
    axiosSecure
      .patch(`/allUsers?id=${_id}`, { status: "active" })
      .then(() => {
        console.log("success Unblock");
        Swal.fire({
          title: "Great job!",
          text: `UnBlock Successful`,
          icon: "success",
        });
        refetch();
      })
      .catch(() => {
        console.log("error Unblock");
      });

  }
  const handleAdmin = (_id,name) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Admin",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/allUsers?id=${_id}`, { role: "admin" })
          .then(() => {
            console.log("success Unblock");
            refetch();
          })
          .catch(() => {
            console.log("error admin");
          });
        Swal.fire({
          title: "Great job!",
          text: `${name} is now a admin`,
          icon: "success",
        });
      }
    });

  }
  const handleVolunteer = (_id,name) =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Make Volunteer",
    }).then((result) => {
      if (result.isConfirmed) {
         axiosSecure
           .patch(`/allUsers?id=${_id}`, { role: "volunteer" })
           .then(() => {
             console.log("success Unblock");
             refetch();
           })
           .catch(() => {
             console.log("error admin");
           });
        Swal.fire({
          title: "Great job!",
          text: `${name} is now a volunteer`,
          icon: "success",
        });
      }
    });
   

  }

  const isBlockStatus = ['block','active'];
  const [statusValue, setStatusValue] = React.useState("active");



 

  const filterReq = AllUsers?.filter((item) => item.status === statusValue);
  console.log("filterData", filterReq);
  return (
    <Paper sx={{ width: "100%", px: "20px" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <Box sx={{ minWidth: 120, my: "30px" }}>
                <FormControl sx={{ minWidth: 120 }} size="small">
                  <InputLabel id="demo-select-small-label">Select</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={statusValue}
                    label="Select"
                    onChange={(event) => setStatusValue(event.target.value)}
                  >
                    {isBlockStatus?.map((ws) => (
                      <MenuItem key={ws} value={ws}>
                        {ws}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 0,
                    minWidth: column.minWidth,
                    fontWeight: "700",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filterReq
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns?.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "block" ? (
                            <button
                              onClick={() => handleBlock(row?._id)}
                              className=" p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 "
                            >
                              <MdBlock className="text-[20px] text-white " />
                            </button>
                          ) : column.id === "unBlock" ? (
                            <button
                              onClick={() => handleUnBlock(row?._id)}
                              className="bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded"
                            >
                              <RiLockUnlockFill className="text-[20px] text-white " />
                            </button>
                          ) : column.id === "makeVolunteer" ? (
                            <button
                              onClick={() => handleVolunteer(row?._id,row?.name)}
                              className="bg-[#29ADB2] hover:bg-[#219296] text-white font-bold p-2 rounded"
                            >
                              <RiTeamLine className="text-[20px] text-white " />
                            </button>
                          ) : column.id === "makeAdmin" ? (
                            <button
                              onClick={() => handleAdmin(row?._id,row?.name)}
                              className="bg-[#7071E8] hover:bg-[#5050e4] text-white font-bold p-2 rounded"
                            >
                              <RiAdminFill className="text-[20px] text-white " />
                            </button>
                          ) : column.id === "image" ? (
                            <img
                              className="w-[70px] h-[70px] object-cover rounded-lg shadow-md"
                              src={row?.imageUrl}
                              alt=""
                            />
                          ) : column.id === "status" ? (
                            <p
                              className={`${
                                row?.status === "active"
                                  ? "bg-blue-500"
                                  : "bg-red-800"
                              } p-2 text-white  rounded-lg`}
                            >
                              {row?.status}
                            </p>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 10, 100]}
        component="div"
        count={AllUsers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
