import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import Skills from "./Pages/Skills/Skills";
import Users from "./Pages/User/Users";
import Dashboard from "./Pages/Dashboard/Dashboard";














const router = createBrowserRouter([
  {
    path: "/",
    // element: <Login/>,
    element: <Dashboard/>,
  },
  
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },


  {
    path: "/skills",
    element: <Skills/>,
  },



  {
    path: "/users",
    element: <Users/>,
  },

 
]);


export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}