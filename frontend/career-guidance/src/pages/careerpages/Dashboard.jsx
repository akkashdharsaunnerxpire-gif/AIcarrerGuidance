import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { LogOut, Menu, X } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Scroll refs
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const menuRef = useRef(null);

  // UI states
  const [showMenu, setShowMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  const scrollTo = (ref) => {
    setMobileNav(false);
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white font-[Poppins]">
      {/* ================= HEADER ================= */}
      <header className="container mx-auto px-4 sm:px-6 py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-bold">
            CareerPath AI
          </h1>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex space-x-8 text-lg">
              <li>
                <button onClick={() => navigate("/dashboard")} className="hover:text-pink-300">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo(aboutRef)} className="hover:text-pink-300">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo(contactRef)} className="hover:text-pink-300">
                  Contact
                </button>
              </li>
            </ul>

            {/* USER AVATAR */}
            {user?.name && (
              <div className="relative" ref={menuRef}>
                <div
                  onClick={() => setShowMenu(!showMenu)}
                  className="w-11 h-11 rounded-full cursor-pointer bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-bold text-xl shadow-xl"
                >
                  {user.name.charAt(0)}
                </div>

                {showMenu && (
                  <div className="absolute right-0 mt-4 w-56 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl z-50">
                    <div className="px-5 py-4 border-b border-white/20">
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs opacity-70">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowMenu(false);
                        setShowLogoutModal(true);
                      }}
                      className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/20"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden"
            onClick={() => setMobileNav(!mobileNav)}
          >
            {mobileNav ? <X size={30} /> : <Menu size={30} />}
          </button>
        </nav>

        {/* MOBILE NAV */}
        {mobileNav && (
          <div className="md:hidden mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-6 space-y-4">
            <button onClick={() => navigate("/dashboard")} className="block w-full text-left">
              Home
            </button>
            <button onClick={() => scrollTo(aboutRef)} className="block w-full text-left">
              About
            </button>
            <button onClick={() => scrollTo(contactRef)} className="block w-full text-left">
              Contact
            </button>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="block w-full text-left text-red-400"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* ================= HERO ================= */}
      <main className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <h2 className="text-4xl sm:text-6xl font-bold mb-6">
          Find Your Dream Career
        </h2>

        <p className="text-lg sm:text-xl mb-10 max-w-3xl mx-auto opacity-90">
          Get personalized career recommendations powered by AI.
        </p>

        {user?.name && (
          <p className="mb-6 text-pink-200">
            Welcome back, <span className="font-semibold">{user.name}</span> 👋
          </p>
        )}

        <button
          onClick={() => navigate("/interest")}
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-10 py-3 sm:px-12 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:scale-105 transition"
        >
          Find your Career 🚀
        </button>
      </main>

      {/* ================= ABOUT ================= */}
      <section ref={aboutRef} className="container mx-auto px-4 sm:px-6 py-20 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">
          About CareerPath AI
        </h3>
        <p className="max-w-4xl mx-auto text-base sm:text-lg opacity-90">
          CareerPath AI helps students choose the right career using Artificial Intelligence and Machine Learning.
        </p>
      </section>

      {/* ================= CONTACT ================= */}
      <section ref={contactRef} className="container mx-auto px-4 sm:px-6 py-20 text-center">
        <h3 className="text-3xl sm:text-4xl font-bold mb-6">
          Contact Us
        </h3>
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-xl space-y-2">
          <p>📧 careerpathai@gmail.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 Tamil Nadu, India</p>
        </div>
      </section>

      {/* ================= LOGOUT MODAL ================= */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-md text-center text-black">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              Confirm Logout
            </h2>
            <p className="mb-6">Are you sure you want to logout?</p>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-6 py-2 border rounded-lg hover:bg-black hover:text-white transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-6 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="container mx-auto px-4 sm:px-6 py-6 text-center opacity-80 text-sm">
        &copy; 2026 CareerPath AI. All rights reserved.
      </footer>
    </div>
  );
};

export default Dashboard;
