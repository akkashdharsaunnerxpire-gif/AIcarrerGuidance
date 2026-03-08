import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const Studentlayout = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-64px)]">
          <Outlet />
        </div>
    </>
  );
};

export default Studentlayout;
