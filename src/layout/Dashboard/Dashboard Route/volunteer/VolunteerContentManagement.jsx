import { Link } from "react-router-dom";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";


import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";


import { useQuery } from "@tanstack/react-query";


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

];

const VolunteerContentManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: AllBlogs } = useQuery({
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
  

  

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
 
  const WorkingStatus = ["draft", "published"];
  const [statusValue, setStatusValue] = React.useState("draft");

 
  

  const filterReq = AllBlogs?.filter((item) => item.blogStatus === statusValue);
  console.log("filterData", filterReq);
  return (
    <div>
      <h1 className=" pt-2 pb-6 text-3xl text-center">
        Content <span className="text-red-600">Management</span>
      </h1>
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
                    style={{
                      top: 0,
                      minWidth: column.minWidth,
                      fontSize: "15px",
                      fontWeight: "600",
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
                .map((row, idx) => {
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
                            {column.id === "SI" ? (
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

export default VolunteerContentManagement;
