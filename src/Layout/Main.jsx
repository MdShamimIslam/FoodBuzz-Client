import React from 'react';
import Navbar from '../pages/Shared/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer';

const Main = () => {
    return (
          <>
          <div className="font-poppins max-w-7xl mx-auto">
             <header> <Navbar></Navbar></header>
              <Outlet></Outlet>
          </div>
          <Footer />
      </>
    );
};

export default Main;