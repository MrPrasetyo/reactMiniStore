import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, Typography } from "@material-tailwind/react";
import profilImage from "../assets/profil.jpg";

const Navbar = () => {
  const activeClass = ({ isActive }) => (isActive ? "" : "");
  return (
    <>
      <nav className="bg-gradient-to-br from-cyan-600 to-blue-600">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">
            <div className="flex items-center">
              <NavLink to="/">
                <Avatar src={profilImage} alt="logo" />
              </NavLink>
            </div>
            <div>
              <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
                  <NavLink to="/" className="flex items-center">
                    Home
                  </NavLink>
                </Typography>
                <Typography as="li" variant="small" color="blue-gray" className="flex items-center gap-x-2 p-1 font-medium">
                  <NavLink to="/store" className="flex items-center">
                    Store
                  </NavLink>
                </Typography>
              </ul>
            </div>
            <div></div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
