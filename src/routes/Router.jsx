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
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import DonorRoute from "./DonorRoute";
import VolunteerAllDonationReq from "../layout/Dashboard/Dashboard Route/volunteer/VolunteerAllDonationReq";
import VolunteerContentManagement from './../layout/Dashboard/Dashboard Route/volunteer/VolunteerContentManagement';
import VolunteerRoute from './VolunteerRoute';
import Error from "../pages/Error/Error";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement:<Error></Error>,
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
        element: (
          <PrivateRoute>
            <DonationReqDetails></DonationReqDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
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
        element: (
          <DonorRoute>
            <DonorDashboardCreateReq></DonorDashboardCreateReq>
          </DonorRoute>
        ),
      },
      {
        path: "/dashboard/my request",
        element: (
          <DonorRoute>
            <DonorMyReq></DonorMyReq>
          </DonorRoute>
        ),
      },
      {
        path: "/dashboard/editRequest/:id",
        element: <DonorEditReq></DonorEditReq>,
      },
      {
        path: "/dashboard/view Request/:id",
        element: (
          <DonorRoute>
            <DonorReqView></DonorReqView>
          </DonorRoute>
        ),
      },
      // adimn dashbaord start
      {
        path: "/dashboard/all users",
        element: (
          <AdminRoute>
            <AdminAllUsers></AdminAllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all donation request",
        element: (
          <AdminRoute>
            <AdminDonationReq></AdminDonationReq>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all donation request/:id",
        element: <DonorEditReq></DonorEditReq>,
      },
      {
        path: "/dashboard/content management",
        element: (
          <AdminRoute>
            <AdminContentManagement></AdminContentManagement>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/content management/add blog",
        element: (
          <AdminRoute>
            <AdminAddBlog></AdminAddBlog>
          </AdminRoute>
        ),
      },
      // volunteer start
      {
        path: "/dashboard/all blood donation request",
        element: (
          <VolunteerRoute>
            <VolunteerAllDonationReq></VolunteerAllDonationReq>
          </VolunteerRoute>
        ),
      },
      {
        path: "/dashboard/volunteer content management",
        element: (
          <VolunteerRoute>
            <VolunteerContentManagement></VolunteerContentManagement>
          </VolunteerRoute>
        ),
      },
    ],
  },
]);

export default Router;