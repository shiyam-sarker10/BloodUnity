import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import parse from "html-react-parser";

export default function Blog() {


    const axiosPublic = useAxiosPublic()
    const [blogs,setBlogs] = useState()


    useEffect(() => {
      axiosPublic
        .get(`/PublishedBlogs?status=published`)
        .then((res) => {
          console.log(res.data)
          setBlogs(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, [axiosPublic]);
  return (
    <div className="my-20">
      <h1 className=" text-2xl md:text-4xl  text-center font-bold">
        Read <span className="text-red-600">Blogs</span>
      </h1>
      <div className="grid grid-cols-1 md:p-10 lg:p-20 justify-center md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog) => (
          <Card sx={{ maxWidth: 345 }} key={blog.id}>
            <CardMedia
              component="img"
              alt="Blog Image"
              sx={{ width: "100%", height: "200px" }}
              image={blog?.imageUrl}
            />
            <CardContent sx={{flex:"1 1 0%"}}>
              <Typography gutterBottom variant="h6" component="div">
                {blog?.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {parse(blog?.blogContent.slice(0, 250))}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}
