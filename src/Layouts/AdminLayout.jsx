import React from "react";
import SidebarStore, { SidebarItem } from "../components/SidebarStore";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaStoreAlt } from "react-icons/fa";
import { IoBagAddSharp, IoStatsChart, IoPersonCircleSharp, IoExit, IoSettings     } from "react-icons/io5";

const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <SidebarStore> 
          <SidebarItem icon={<FaStoreAlt className="group-hover:text-green-500"/>} text="Product Management" link="/admin"/>
          <SidebarItem icon={<IoBagAddSharp />} text="Add Product" link="add-product"/>
          <SidebarItem icon={<IoStatsChart />} text="Statistic"/>
          <SidebarItem icon={<IoPersonCircleSharp  />} text="User Management"/>
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
          <hr className="my-3"/>
          <SidebarItem icon={<IoSettings  />} text="Settings"/>
          <SidebarItem icon={<IoExit className="group-hover:text-red-500"/>} text="Back to Home" link="/"/>
        </SidebarStore>
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
};

export default AdminLayout;
