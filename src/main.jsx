// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";

// import Layout from "./Allcomponent/Manilayout/Layout";
// import Error from "./Allcomponent/Error/Error";
// import Hero from "./Allcomponent/Hero/Hero";

// import NeddPost from './Allcomponent/All volunteer Need posts/NeddPost';
// // import MYPosts from "./Allcomponent/MYPosts";
// import MYProfile from "./Allcomponent/All volunteer Need posts/MYProfile";
// import ADDVolunter from "./Allcomponent/All volunteer Need posts/ADDVolunter";
// import MYVolunter from "./Allcomponent/All volunteer Need posts/MYVolunter";
// import MyRequest from "./Allcomponent/All volunteer Need posts/MyRequest";
// import PostDetalies from "./Allcomponent/PostDetailes/PostDetalies";
// import PostUpdated from './Allcomponent/All volunteer Need posts/PostUpdated';

// import { ThemeProvider } from "./Allcomponent/ThemeContext/ThemeContext";
// import AuthProvider from "./Allcomponent/AuthSection/AuthProvider";
// import PrivateRoute from './Allcomponent/AuthSection/PrivateRoute';
// import Login from "./Allcomponent/Hero/Signup&Login/Login";
// import Signup from "./Allcomponent/Hero/Signup&Login/Signup";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <Error />,
//     children: [
//       {
//         index: true,
//         element: <Hero />
//       },
//       // Protected Routes
//       {
//         path: "posts",
//         element: <PrivateRoute><NeddPost /></PrivateRoute>
//       },
//       // {
//       //   path: "my-posts",
//       //   element: <PrivateRoute><MYPosts /></PrivateRoute>
//       // },
//       {
//         path: '/add-volunteer',
//         element: <PrivateRoute><ADDVolunter /></PrivateRoute>
//       },
//       {
//         path: "my-profile",
//         element: <PrivateRoute><MYProfile /></PrivateRoute>
//       },
//       {
//         path: 'My-Volunter',
//         element: <PrivateRoute><MYVolunter /></PrivateRoute>
//       },
//       {
//         path: '/my-Request',
//         element: <PrivateRoute><MyRequest /></PrivateRoute>
//       },
//       {
//         path: 'postDetalies/:id',
//         element: <PrivateRoute><PostDetalies /></PrivateRoute>
//       },
//       {
//         path:'PostUpdated/:id',
//         element: <PrivateRoute><PostUpdated /></PrivateRoute>
//       },
//       {
//         path:'NeddPost/:id',
//         element: <PrivateRoute><NeddPost /></PrivateRoute>
//       },
//       // Public Routes
//       {
//         path: 'login',
//         element: <Login />
//       },
//       {
//         path: 'signup',
//         element: <Signup />
//       }
//     ],
//   },
// ]);

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <ThemeProvider>
//       <AuthProvider>
//         <RouterProvider router={router} />
//       </AuthProvider>
//     </ThemeProvider>
//   </React.StrictMode>
// );





















// src/index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./Allcomponent/Manilayout/Layout";
import Error from "./Allcomponent/Error/Error";
import Hero from "./Allcomponent/Hero/Hero";

import NeddPost from './Allcomponent/All volunteer Need posts/NeddPost';
import MYProfile from "./Allcomponent/All volunteer Need posts/MYProfile";
import ADDVolunter from "./Allcomponent/All volunteer Need posts/ADDVolunter";
import MYVolunter from "./Allcomponent/All volunteer Need posts/MYVolunter";
import MyRequest from "./Allcomponent/All volunteer Need posts/MyRequest";
import PostDetalies from "./Allcomponent/PostDetailes/PostDetalies";
import PostUpdated from './Allcomponent/All volunteer Need posts/PostUpdated';

import Login from "./Allcomponent/Hero/Signup&Login/Login";
import Signup from "./Allcomponent/Hero/Signup&Login/Signup";

import { ThemeProvider } from "./Allcomponent/ThemeContext/ThemeContext";
import AuthProvider from "./Allcomponent/AuthSection/AuthProvider";
import PrivateRoute from './Allcomponent/AuthSection/PrivateRoute';
import PageTitle from "./Allcomponent/DyanmicTitke/Helmate";

// Routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: (
          <>
            <PageTitle title="This is Home page" />
            <Hero />
          </>
        ),
      },
      // Protected Routes
      {
        path: "posts",
        element: (
          <PrivateRoute>
            <PageTitle title="All Posts Section" />
            <NeddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "add-volunteer",
        element: (
          <PrivateRoute>
            <PageTitle title="Add Volunteer" />
            <ADDVolunter />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <PageTitle title="My Profile" />
            <MYProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "My-Volunter",
        element: (
          <PrivateRoute>
            <PageTitle title="My Volunteers post" />
            <MYVolunter />
          </PrivateRoute>
        ),
      },
      {
        path: "my-Request",
        element: (
          <PrivateRoute>
            <PageTitle title="My Requests" />
            <MyRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "postDetalies/:id",
        element: (
          <PrivateRoute>
            <PageTitle title="Post Details " />
            <PostDetalies />
          </PrivateRoute>
        ),
      },
      {
        path: "PostUpdated/:id",
        element: (
          <PrivateRoute>
            <PageTitle title="Update Post " />
            <PostUpdated />
          </PrivateRoute>
        ),
      },
      // Public Routes
      {
        path: "login",
        element: (
          <>
            <PageTitle title="Login page" />
            <Login />
          </>
        ),
      },
      {
        path: "signup",
        element: (
          <>
            <PageTitle title="Signup page" />
            <Signup />
          </>
        ),
      },
    ],
  },
]);

// Root render
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
