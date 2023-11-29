import React from 'react';
import JoditEditor from "jodit-react";
import { useState, useRef, useMemo } from "react";

import { TextField } from "@mui/material";
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import axios from 'axios';
import Swal from 'sweetalert2';



const AdminAddBlog = () => {

     const [showImage, setShowImage] = useState({});

       const axiosPublic = useAxiosPublic();
       const [userInfo, setUserInfo] = useState([]);



    //    content jotis 

       const editor = useRef(null);
       const [content, setContent] = useState("");

       // image hosting  on image bb image api and key

       const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

       const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;




    //    handle Add blog 


     const handleAddBlog = async (e) => {

       e.preventDefault();

       const title = e.target.title.value;
       const image = e.target.image.files[0];
       const blogContent = content
  
       setShowImage(image);

       const imageFile = { image: image };

       const imageRes = await axios.post(image_hosting_api, imageFile, {
         headers: {
           "content-type": "multipart/form-data",
         },
       });
       const imageUrl = imageRes.data.data.display_url;

       const Info = {
         title,
         imageUrl,
         blogContent,
         blogStatus:'draft'
       };
       console.log(Info);
       axiosPublic.post("/allBlogs", Info)
       .then((res) => {
         if (res.data.insertedId) {
           Swal.fire({
             title: "Good job!",
             text: "You created a blog",
             icon: "success",
           });
         }
       })
       .catch(()=>{
        console.log("blog error")
       })
       

     };


   

      
    


    return (
      <div className="flex  flex-col justify-center items-center">
        <div className="border w-[60vw] shadow-md p-8 rounded-lg">
          <form className="" onSubmit={handleAddBlog}>
            <h3 className="text-3xl  my-4 font-bold text-center">
              Create Your <span className="text-red-500">Blog</span>
            </h3>
            <div className='space-y-2 py-4'>
              <label htmlFor="" className="font-bold">
                Your Title :
              </label>
              <TextField
                sx={{ width: "100%" }}
                id="outlined-basic"
                label="Title"
                variant="outlined"
                size="small"
                name="title"
              />
            </div>

            <div className="space-y-2 py-4">
              <label htmlFor="" className="font-bold">
                Your Thumbnail :
              </label>
              <div className="flex w-full mx-auto  overflow-hidden  items-center justify-center bg-grey-lighter">
                <label className=" w-full flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-red-600">
                  <svg
                    className="w-8 h-8"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal capitalize">
                    {showImage?.name ? showImage?.name : "select thumbnail"}
                  </span>
                  <input type="file" className="hidden" name="image" />
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="" className="font-bold">
                Your Content :
              </label>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={(newContent) => {}}
              />
            </div>
            <input
              className=" w-full py-2 my-2 bg-[#C91C1C] rounded-md text-[#f2f2f2]"
              type="submit"
              value="Register"
            />
          </form>
          
        </div>
      </div>
    );
};

export default AdminAddBlog;