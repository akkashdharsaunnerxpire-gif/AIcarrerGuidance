import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/Sidebar";
import AdminTopBar from "../components/AdminTopBar";
import { useState } from "react";
const Layout = () => {
  const [open, setOpen] = useState(false);
  return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <AdminSidebar open={open} setOpen={setOpen} />

        {/* Main Section */}
        <div className="flex-1 w-full">
          {/* Top Bar (mobile only) */}
          <AdminTopBar setOpen={setOpen} />

          {/* Content */}
          <main
            className="
          pt-16 md:pt-6
          px-4
          md:ml-64
          flex justify-center
          "
          >
            <div className="w-full max-w-6xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
  );
};

export default Layout;
