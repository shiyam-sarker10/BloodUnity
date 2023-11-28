import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import useAllReq from "../../../../hooks/useAllReq";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useUserInfo from "../../../../hooks/useUserInfo";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BrushIcon from '@mui/icons-material/Brush';
import DeleteIcon from '@mui/icons-material/Delete';
import PreviewIcon from "@mui/icons-material/Preview";

const columns = [
  { id: "recipientName", label: "Recipient", minWidth: 100 },
  {
    id: "workStatus",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
  {
    id: "hospitalName",
    label: "Hospital",
    minWidth: 100,
    align: "center",
  },
  {
    id: "donationDate",
    label: "Donation Date",
    minWidth: 100,
    align: "center",
  },

  {
    id: "fullAddress",
    label: "Address",
    minWidth: 100,
    align: "center",
  },
  {
    id: "district",
    label: "District",
    minWidth: 100,
    align: "center",
  },
  {
    id: "edit",
    label: "Edit",
    minWidth: 80,
    align: "center",
  },
  {
    id: "remove",
    label: "remove",
    minWidth: 80,
    align: "center",
  },
  {
    id: "view",
    label: "remove",
    minWidth: 80,
    align: "center",
  },
];




export default function DonorMyReq() {
  const [UserInfo] = useUserInfo()

  const {AllReq,refetch} = useAllReq()
  console.log(AllReq);
  

  const axiosSecure = useAxiosSecure()
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
   const handleDelete = (_id) => {
     if (UserInfo.status === "blocked") {
       return Swal.fire({
         title: "Request Denied",
         text: "Blocker user cannot make donation request",
         icon: "error",
       });
     } else {
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
               refetch();
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

   const WorkingStatus = ["pending", "inprogress","done","canceled"];
   const donorStatus = ["done", "canceled"];
   const [statusValue, setStatusValue] = React.useState("pending");
   const [donorStatusValue, setDonorStatusValue] = React.useState("inprogress");
   const [SingleId, setSingleId] = React.useState("");
  
  
  
    
    const newStatus = donorStatusValue;
    if (newStatus === "done" || newStatus === "canceled") {
    try {
      axiosSecure.patch(`/allRequest?id=${SingleId}`, {
        workStatus: newStatus,
      }).then(()=>{
        console.log("PATCH successful");
        refetch();
      })
      
    } catch (error) {
      console.error("PATCH not successful", error);
    }
  } 

  

  console.log("this is sub", donorStatusValue, SingleId);
  
  
  const filterReq = AllReq?.filter((item) => item.workStatus === statusValue);
  console.log("filterData",filterReq)
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
                      {WorkingStatus?.map((ws) => (
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
                    style={{ top: 0, minWidth: column.minWidth }}
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
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns?.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "edit" ? (
                              <Link
                                to={`/dashboard/editRequest/${row?._id}`}
                                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 pl-2 text-center  rounded"
                              >
                                <BrushIcon
                                  sx={{
                                    textAlign: "center",
                                    mr: 1,
                                    fontSize: "20px",
                                    color: "white",
                                  }}
                                />
                              </Link>
                            ) : column.id === "workStatus" ? (
                              row?.workStatus === "inprogress" ? (
                                <FormControl
                                  variant="filled"
                                  sx={{ minWidth: 180 }}
                                  size="small"
                                >
                                  <InputLabel id="demo-select-small-label">
                                    in progress
                                  </InputLabel>
                                  <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    value={donorStatusValue}
                                    label="Select"
                                    onChange={(event) => {
                                      setDonorStatusValue(event.target.value);
                                      setSingleId(row?._id);
                                    }}
                                  >
                                    {donorStatus?.map((ws) => (
                                      <MenuItem key={ws} value={ws}>
                                        {ws}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              ) : row?.workStatus === "done" ? (
                                <p
                                  className={`bg-green-500 py-1 rounded-lg font-semibold text-white`}
                                >
                                  Done
                                </p>
                              ) : row?.workStatus === "canceled" ? (
                                <p
                                  className={`bg-red-500 py-1 rounded-lg font-semibold text-white`}
                                >
                                  canceled
                                </p>
                              ) : (
                                <p
                                  className={`bg-amber-500 py-1 rounded-lg font-semibold text-white`}
                                >
                                  pending
                                </p>
                              )
                            ) : column.id === "remove" ? (
                              <button
                                onClick={() => handleDelete(row?._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 pl-2 rounded"
                              >
                                <DeleteIcon
                                  sx={{
                                    width: "full",
                                    textAlign: "center",
                                    mr: 1,
                                    fontSize: "20px",
                                    color: "white",
                                  }}
                                />
                              </button>
                            ) : column.id === "view" ? (
                              <Link
                                to={`/dashboard/view Request/${row?._id}`}
                                className=" bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 pl-2 text-center  rounded"
                              >
                                <PreviewIcon
                                  sx={{
                                    textAlign: "center",
                                    mr: 1,
                                    fontSize: "20px",
                                    color: "white",
                                  }}
                                />
                              </Link>
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
          count={AllReq?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    );
}
