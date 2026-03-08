import { Menu } from "lucide-react";

const AdminTopBar = ({ setOpen }) => {
  return (
    <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
      <span className="font-bold text-lg">Admin Panel</span>
      <button onClick={() => setOpen(true)}>
        <Menu size={24} />
      </button>
    </header>
  );
};

export default AdminTopBar;
