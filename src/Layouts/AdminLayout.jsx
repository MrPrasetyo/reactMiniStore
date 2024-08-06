import React from "react";
import SidebarStore, { SidebarItem } from "../components/SidebarStore";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FaStoreAlt } from "react-icons/fa";

const AdminLayout = () => {
  return (
    <>
      <div className="flex">
        <SidebarStore> 
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
          <SidebarItem icon={<FaStoreAlt />} text="Store Management"/>
        </SidebarStore>
        <Outlet />
      </div>

      <ToastContainer />
    </>
  );
};

export default AdminLayout;
