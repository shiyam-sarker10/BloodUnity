
import { Link } from 'react-router-dom';
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

import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import BrushIcon from "@mui/icons-material/Brush";
import DeleteIcon from "@mui/icons-material/Delete";

import { useQuery } from '@tanstack/react-query';
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import useUserInfo from '../../../../hooks/useUserInfo';

const columns = [
  { id: "SI", label: "SI No.", minWidth: 80 },
  {
    id: "title",
    label: "Title",
    minWidth: 80,
    align: "left",
  },
  {
    id: "imageUrl",
    label: "Thumbnail",
    minWidth: 80,
    align: "left",
  },
  {
    id: "blogStatus",
    label: "Status",
    minWidth: 80,
    align: "left",
  },
  {
    id: "publish",
    label: "Publish",
    minWidth: 80,
    align: "left",
  },
  {
    id: "unPublish",
    label: "UnPublish",
    minWidth: 80,
    align: "left",
  },
  {
    id: "delete",
    label: "Status",
    minWidth: 80,
    align: "left",
  },
];

const AdminContentManagement = () => {



 const axiosSecure = useAxiosSecure();
const {
  refetch,
  data: AllBlogs,
} = useQuery({
  queryKey: ["allBlogs"],
  queryFn: async () => {
    try {
      const res = await axiosSecure.get(`/allBlogs`);
      return res.data;
    } catch (error) {
      console.error("Error fetching req information:", error);
      throw error;
    }
  },
});
const [UserInfo] = useUserInfo()

console.log("data", AllBlogs)


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
    if (!UserInfo.role === "admin"){
        return Swal.fire({
          title: "Delete Unsuccessful",
          text: "Only Admin can perform Delete",
          icon: "success",
        });
    }
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

  };

  const WorkingStatus = ["draft", "published"];
  const [statusValue, setStatusValue] = React.useState("draft");


  const handleUnPublish = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "UnPublish this post",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/allBlogs?id=${_id}`, { blogStatus: "draft" })
          .then(() => {
            console.log("success Unblock");
            refetch();
          })
          .catch(() => {
            console.log("error admin");
          });
        Swal.fire({
          title: "Great job!",
          text: `This post is now UnPublished`,
          icon: "success",
        });
      }
    });
  }
  const handlePublish = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Publish this post",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/allBlogs?id=${_id}`, { blogStatus: "published" })
          .then(() => {
            console.log("success Unblock");
            refetch();
          })
          .catch(() => {
            console.log("error admin");
          });
        Swal.fire({
          title: "Great job!",
          text: `This post is now Published`,
          icon: "success",
        });
      }
    });
  }




  const filterReq = AllBlogs?.filter((item) => item.blogStatus === statusValue);
  console.log("filterData", filterReq);
    return (
      <div>
        <Link
          to="/dashboard/content management/add blog"
          className="flex justify-end py-4"
        >
          <button className="bg-lime-500 py-2  px-4 rounded-lg font-semibold text-white">
            Add Blog
          </button>
        </Link>
        <Paper sx={{ width: "100%", px: "20px" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <Box sx={{ minWidth: 120, my: "30px" }}>
                    <FormControl sx={{ minWidth: 120 }} size="small">
                      <InputLabel id="demo-select-small-label">
                        Select
                      </InputLabel>
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
                      style={{ top: 0, minWidth: column.minWidth, fontSize:"15px", fontWeight:'600' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filterReq
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row,idx) => {
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
                              ) : column.id === "SI" ? (
                                <p className="font-bold ">{idx + 1}</p>
                              ) : column.id === "imageUrl" ? (
                                <img
                                  className="w-[70px] h-[70px] object-cover rounded-lg shadow-md"
                                  src={row?.imageUrl}
                                  alt=""
                                />
                              ) : column.id === "blogStatus" ? (
                                <p
                                  className={`font-bold ${
                                    row?.blogStatus === "draft"
                                      ? "bg-gray-500"
                                      : "bg-teal-500"
                                  }  py-2 px-4  rounded-lg text-center text-white`}
                                >
                                  {row?.blogStatus}
                                </p>
                              ) : column.id === "publish" ? (
                                <button
                                  onClick={() => handlePublish(row?._id)}
                                  className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 px-2 rounded"
                                >
                                  <FaRegCheckCircle className="text-[20px] text-white" />
                                </button>
                              ) : column.id === "unPublish" ? (
                                <button
                                  onClick={() => handleUnPublish(row?._id)}
                                  className="bg-amber-500 hover:bg-amber-700  text-white font-bold py-2 px-2 rounded"
                                >
                                  <MdOutlineCancel className="text-[20px] text-white" />
                                </button>
                              ) : column.id === "delete" ? (
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
            count={AllBlogs?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
};

export default AdminContentManagement;