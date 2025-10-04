// import * as React from "react";
// import * as ReactDOM from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";

// import Layout from "./Allcomponent/Manilayout/Layout";
// import Error from "./Allcomponent/Error/Error";
// import NeddPost from './Allcomponent/All volunteer Need posts/NeddPost';
// import MYPosts from "./Allcomponent/All volunteer Need posts/MYPosts";
// import MYProfile from "./Allcomponent/All volunteer Need posts/MYProfile";
// import Hero from "./Allcomponent/Hero/Hero";

// import { ThemeProvider } from "./Allcomponent/ThemeContext/ThemeContext";
// import Login from "./Allcomponent/Hero/Signup&Login/Login";
// import Signup from "./Allcomponent/Hero/Signup&Login/Signup";
// import ADDVolunter from "./Allcomponent/All volunteer Need posts/ADDVolunter";
// import AuthProvider from "./Allcomponent/AuthSection/AuthProvider";
// import MYVolunter from "./Allcomponent/All volunteer Need posts/MYVolunter";
// import MyRequest from "./Allcomponent/All volunteer Need posts/MyRequest";
// import PrivateRoute from './Allcomponent/AuthSection/PrivateRoute';
// import PostDetalies from "./Allcomponent/PostDetailes/PostDetalies";
// import PostUpdated from './Allcomponent/All volunteer Need posts/PostUpdated';

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
//       {
//         path: "posts",
//         element: <PrivateRoute>
//           <NeddPost />
//         </PrivateRoute>
//       },
//       {
//         path: "my-posts",
//         element: <MYPosts />
//       },
//       {
//         path: '/add-volunteer',
//         element: <ADDVolunter></ADDVolunter>
//       },
//       {
//         path: "my-profile",
//         element: <MYProfile />
//       },
//       {
//         path: 'My-Volunter',
//         element: <MYVolunter></MYVolunter>
//       },
//       {
//         path: '/my-Request',
//         element: <MyRequest></MyRequest>
//       },
//       {
//         path: 'login',
//         element: <Login></Login>
//       },
//       {
//         path: 'signup',
//         element: <Signup></Signup>
//       },
//       {
//         path: 'postDetalies/:id',
//         element: <PostDetalies />
//       },
//      {
//       path:'PostUpdated/:id',
//       element:<PostUpdated></PostUpdated>
//      },
//      {
//       path:'NeddPost/:id',
//       element:<NeddPost></NeddPost>
//      }
    
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


























import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./Allcomponent/Manilayout/Layout";
import Error from "./Allcomponent/Error/Error";
import Hero from "./Allcomponent/Hero/Hero";

import NeddPost from './Allcomponent/All volunteer Need posts/NeddPost';
import MYPosts from "./Allcomponent/All volunteer Need posts/MYPosts";
import MYProfile from "./Allcomponent/All volunteer Need posts/MYProfile";
import ADDVolunter from "./Allcomponent/All volunteer Need posts/ADDVolunter";
import MYVolunter from "./Allcomponent/All volunteer Need posts/MYVolunter";
import MyRequest from "./Allcomponent/All volunteer Need posts/MyRequest";
import PostDetalies from "./Allcomponent/PostDetailes/PostDetalies";
import PostUpdated from './Allcomponent/All volunteer Need posts/PostUpdated';

import { ThemeProvider } from "./Allcomponent/ThemeContext/ThemeContext";
import AuthProvider from "./Allcomponent/AuthSection/AuthProvider";
import PrivateRoute from './Allcomponent/AuthSection/PrivateRoute';
import Login from "./Allcomponent/Hero/Signup&Login/Login";
import Signup from "./Allcomponent/Hero/Signup&Login/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Hero />
      },
      // Protected Routes
      {
        path: "posts",
        element: <PrivateRoute><NeddPost /></PrivateRoute>
      },
      {
        path: "my-posts",
        element: <PrivateRoute><MYPosts /></PrivateRoute>
      },
      {
        path: '/add-volunteer',
        element: <PrivateRoute><ADDVolunter /></PrivateRoute>
      },
      {
        path: "my-profile",
        element: <PrivateRoute><MYProfile /></PrivateRoute>
      },
      {
        path: 'My-Volunter',
        element: <PrivateRoute><MYVolunter /></PrivateRoute>
      },
      {
        path: '/my-Request',
        element: <PrivateRoute><MyRequest /></PrivateRoute>
      },
      {
        path: 'postDetalies/:id',
        element: <PrivateRoute><PostDetalies /></PrivateRoute>
      },
      {
        path:'PostUpdated/:id',
        element: <PrivateRoute><PostUpdated /></PrivateRoute>
      },
      {
        path:'NeddPost/:id',
        element: <PrivateRoute><NeddPost /></PrivateRoute>
      },
      // Public Routes
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
