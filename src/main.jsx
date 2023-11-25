import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router.jsx';
import AuthProvider from './AuthProvider/AuthProvider.jsx';
import { ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={Router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
