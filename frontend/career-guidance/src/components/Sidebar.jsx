import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

const menu = [
  { name: "Dashboard", path: "", icon: <LayoutDashboard size={20} /> },
  { name: "Students Profile", path: "students", icon: <Users size={20} /> },
  {
    name: "Students Feedback",
    path: "feedback",
    icon: <MessageSquare size={20} />,
  },
  { name: "Help", path: "helppage", icon: <HelpCircle size={20} /> },
];

const AdminSidebar = ({ open, setOpen }) => {
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/";
  };

  return (
    <>
      {/* OVERLAY (mobile) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-full w-64 bg-gray-900 text-white
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <span className="text-lg font-bold">Admin Panel</span>
          <button className="md:hidden" onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {menu.map((item) => (
            <NavLink
              to={item.path}
              end={item.path === ""} // ✅ dashboard active fix
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-800 text-gray-300"
                }`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-6 py-4 border-t border-gray-700 hover:bg-red-600"
        >
          <LogOut />
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
