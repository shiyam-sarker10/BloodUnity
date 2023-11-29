import { createBrowserRouter } from "react-router-dom";
import MainLayout from './../layout/MainLayout/MainLayout';
import Home from "../pages/Home/Home";
import DonationReq from "../pages/DonationReq/DonationReq";
import Blog from './../pages/Blog/Blog';
import Login from "../pages/Login/Login";
import Register from './../pages/Register/Register';
import Dashboard from './../layout/Dashboard/Dashboard';
import DashboardProfile from "../layout/Dashboard/Dashboard Route/DashboardProfile";
import DashboardWelcome from "../layout/Dashboard/Dashboard Route/DashboardWelcome";
import DonorDashboardCreateReq from "../layout/Dashboard/Dashboard Route/donor/DonorDashboardCreateReq";
import DonorMyReq from "../layout/Dashboard/Dashboard Route/donor/DonorMyReq";
import DonorEditReq from "../layout/Dashboard/Dashboard Route/donor/DonorEditReq";
import DonorReqView from './../layout/Dashboard/Dashboard Route/donor/DonorReqView';
import Search from './../pages/Search/Search';
import DonationReqDetails from './../pages/DonationReq/DonationReqDetails';
import AdminAllUsers from './../layout/Dashboard/Dashboard Route/Admin/AdminAllUsers';
import AdminDonationReq from './../layout/Dashboard/Dashboard Route/Admin/AdminDonationReq';
import AdminContentManagement from './../layout/Dashboard/Dashboard Route/Admin/AdminContentManagement';
import AdminAddBlog from './../layout/Dashboard/Dashboard Route/Admin/AdminAddBlog';
import Payment from './../pages/Payment/Payment';


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
        path: "Donation Requests",
        element: <DonationReq></DonationReq>,
      },
      {
        path: "Blog",
        element: <Blog></Blog>,
      },
      {
        path: "search",
        element: <Search></Search>,
      },
      {
        path: "donationReq details/:id",
        element: <DonationReqDetails></DonationReqDetails>,
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        index: true,
        element: <DashboardWelcome></DashboardWelcome>,
      },
      {
        path: "/dashboard/profile",
        element: <DashboardProfile></DashboardProfile>,
      },
      {
        path: "/dashboard/create request",
        element: <DonorDashboardCreateReq></DonorDashboardCreateReq>,
      },
      {
        path: "/dashboard/my request",
        element: <DonorMyReq></DonorMyReq>,
      },
      {
        path: "/dashboard/editRequest/:id",
        element: <DonorEditReq></DonorEditReq>,
      },
      {
        path: "/dashboard/view Request/:id",
        element: <DonorReqView></DonorReqView>,
      },
      // adimn dashbaord start
      {
        path: "/dashboard/all users",
        element: <AdminAllUsers></AdminAllUsers>,
      },
      {
        path: "/dashboard/all donation request",
        element: <AdminDonationReq></AdminDonationReq>,
      },
      {
        path: "/dashboard/all donation request/:id",
        element: <DonorEditReq></DonorEditReq>,
      },
      {
        path: "/dashboard/content management",
        element: <AdminContentManagement></AdminContentManagement>,
      },
      {
        path: "/dashboard/content management/add blog",
        element: <AdminAddBlog></AdminAddBlog>,
      },
    ],
  },
]);

export default Router;