import React from 'react';
import { Outlet } from 'react-router-dom';
import ArtistNavbar from '../pages/ArtisitPages/Artist_navbar'; // adjust the path as needed

const ArtistLayout = () => (
  <>
    <ArtistNavbar />
    <Outlet />
  </>
);

export default ArtistLayout;
