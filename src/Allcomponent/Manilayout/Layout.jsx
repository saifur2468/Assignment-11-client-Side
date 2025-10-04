import React from 'react';
import Navbar from './Home/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Layout = () => {
    return (
        <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
 <Navbar></Navbar>
      <main className="p-4">
        <Outlet></Outlet>
      </main>
    

  <Footer></Footer>
    </div>
    );
};

export default Layout;