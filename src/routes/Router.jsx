import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout/MainLayout';
import Home from "../pages/Home/Home";
import DonationReq from "../pages/DonationReq/DonationReq";
import Blog from './../pages/Blog/Blog';
import Login from "../pages/Login/Login";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "Donation-Requests",
        element: <DonationReq></DonationReq>,
      },
      {
        path: "Blog",
        element: <Blog></Blog>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default Router;