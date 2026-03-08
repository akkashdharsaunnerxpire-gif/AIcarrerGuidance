import { useNavigate } from "react-router-dom";
import {
  Users,
  MessageSquare,
  BarChart3,
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { students, loading } = useAdmin();

  const totalStudents = students.length;

  const totalReviews = students.filter(
    (s) => s.review && s.review.trim() !== ""
  ).length;

  const avgRating =
    totalReviews === 0
      ? 0
      : (
          students.reduce((sum, s) => sum + (s.rating || 0), 0) /
          totalReviews
        ).toFixed(1);

  const recentStudents = students.slice(-5).reverse();

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32 text-gray-500">
        Loading admin dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Admin Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Centralized control panel to monitor students, feedbacks
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium w-fit">
          <Activity size={16} />
          System Running Smoothly
        </div>
      </div>

      {/* ================= KPI STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Students"
          value={totalStudents}
          icon={<Users size={28} />}
          gradient="from-indigo-500 to-purple-600"
        />
        <StatCard
          title="Total Feedback"
          value={totalReviews}
          icon={<MessageSquare size={28} />}
          gradient="from-emerald-500 to-teal-600"
        />
        <StatCard
          title="Average Rating"
          value={`${avgRating} ★`}
          icon={<TrendingUp size={28} />}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Quick Admin Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Students Profile"
            desc="View and manage all registered student profiles"
            onClick={() => navigate("/admin/layout/students")}
          />
          <ActionCard
            title="Students Feedback"
            desc="Analyze ratings and reviews submitted by students"
            onClick={() => navigate("/admin/layout/feedback")}
          />
          <ActionCard
            title="Admin Help"
            desc="Understand system features and admin responsibilities"
            onClick={() => navigate("/admin/layout/helppage")}
          />
        </div>
      </div>

      {/* ================= RECENT ACTIVITY ================= */}
      <div className="bg-white rounded-3xl shadow p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="text-indigo-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            Recently Registered Students
          </h2>
        </div>

        {recentStudents.length === 0 ? (
          <p className="text-gray-500">No recent activity</p>
        ) : (
          <ul className="divide-y">
            {recentStudents.map((s, i) => (
              <li key={i} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">
                    {s.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {s.department || "Department not specified"}
                  </p>
                </div>
                <span className="text-xs text-gray-400">
                  New
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

/* ================= STAT CARD ================= */

const StatCard = ({ title, value, icon, gradient }) => (
  <div
    className={`
      relative overflow-hidden
      bg-gradient-to-br ${gradient}
      text-white rounded-3xl p-6
      shadow-lg hover:shadow-2xl
      transition transform hover:-translate-y-1
    `}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm opacity-90">{title}</p>
        <h2 className="text-3xl font-bold mt-2">
          {value}
        </h2>
      </div>

      <div className="bg-white/20 p-4 rounded-2xl">
        {icon}
      </div>
    </div>

    <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
  </div>
);

/* ================= ACTION CARD ================= */

const ActionCard = ({ title, desc, onClick }) => (
  <div
    onClick={onClick}
    className="
      group cursor-pointer
      bg-white rounded-3xl p-6
      shadow hover:shadow-2xl
      transition transform hover:-translate-y-1
      border border-gray-100
    "
  >
    <h3 className="text-lg font-semibold text-gray-800">
      {title}
    </h3>
    <p className="text-sm text-gray-500 mt-2">
      {desc}
    </p>

    <div className="flex items-center gap-2 mt-5 text-indigo-600 font-medium group-hover:gap-3 transition-all">
      Open
      <ArrowRight size={16} />
    </div>
  </div>
);

export default AdminDashboard;
