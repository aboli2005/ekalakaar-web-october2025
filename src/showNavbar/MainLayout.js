import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // adjust the path as needed

const MainLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

export default MainLayout;
