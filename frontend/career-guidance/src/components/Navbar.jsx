import { useState } from "react";
import { Menu, X, User, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 backdrop-blur-md bg-green-700/90 shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <motion.h1
          whileHover={{ scale: 1.08 }}
          className="text-white font-extrabold text-xl tracking-wide cursor-pointer"
        >
          Career <span className="text-green-200">Guidance</span>
        </motion.h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">
          <NavItem to="/">Home</NavItem>

          <NavItem to="/admin" icon={<Shield size={16} />}>
            Admin
          </NavItem>

          <NavLink
            to="/"
            className="flex items-center gap-2 bg-white text-green-700 px-4 py-1.5 rounded-full hover:bg-green-100 transition"
          >
            <User size={16} /> Student
          </NavLink>
        </div>

        {/* MOBILE ICON */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-green-700 text-white px-6 py-4 space-y-4"
          >
            <MobileItem to="/" onClick={() => setOpen(false)}>
              Home
            </MobileItem>
            <MobileItem to="/admin" onClick={() => setOpen(false)}>
              Admin
            </MobileItem>
            <MobileItem to="/login" onClick={() => setOpen(false)}>
              Student Login
            </MobileItem>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavItem = ({ to, icon, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-1 relative ${
        isActive ? "text-green-200" : ""
      }`
    }
  >
    {icon}
    {children}
    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-white transition-all group-hover:w-full"></span>
  </NavLink>
);

const MobileItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="block py-2 hover:text-green-200"
  >
    {children}
  </NavLink>
);

export default Navbar;
