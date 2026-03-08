import { useAdmin } from "../../context/AdminContext";
import { useEffect, useState } from "react";
import AdvancedLoader from "../../components/AdvancedLoader";
import { MessageSquare, Search, Star, Users } from "lucide-react";

const StudentsFeedback = () => {
  const { students, loading } = useAdmin();

  // Page loader
  const [pageLoading, setPageLoading] = useState(true);

  // Search state
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading || pageLoading) {
    return <AdvancedLoader text="Loading student feedback..." />;
  }

  // Only students who have rating or review
  const feedbacks = students.filter(
    (s) => s.rating != null || (s.review && s.review.trim() !== "")
  );

  // Search filter
  const filteredFeedbacks = feedbacks.filter((f) =>
    `${f.name} ${f.review}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Stats
  const avgRating =
    feedbacks.length === 0
      ? 0
      : (
          feedbacks.reduce((sum, f) => sum + (f.rating || 0), 0) /
          feedbacks.length
        ).toFixed(1);

  return (
    <div className="space-y-6">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <MessageSquare className="text-indigo-600" />
          Students Feedback
        </h1>

        {/* SEARCH */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500 text-sm">Total Feedback</p>
          <h2 className="text-3xl font-bold">{feedbacks.length}</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500 text-sm">Average Rating</p>
          <h2 className="text-3xl font-bold flex items-center gap-1">
            <Star className="text-yellow-400 fill-yellow-400" size={24} />
            {avgRating}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p className="text-gray-500 text-sm">Students Reviewed</p>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Users size={22} />
            {new Set(feedbacks.map((f) => f.name)).size}
          </h2>
        </div>
      </div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden lg:block bg-white rounded-2xl shadow overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Student</th>
              <th className="p-4 text-left">Rating</th>
              <th className="p-4 text-left">Feedback</th>
            </tr>
          </thead>

          <tbody>
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center text-gray-500">
                  No feedback found
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((f, i) => (
                <tr key={f.id || i} className="hover:bg-gray-50 transition">
                  <td className="p-4">{i + 1}</td>
                  <td className="p-4 font-semibold">{f.name}</td>
                  <td className="p-4">
                    {f.rating == null ? (
                      "⭐ 0"
                    ) : (
                      <span className="text-yellow-500">
                        {"⭐".repeat(f.rating)}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {f.review && f.review.trim() !== ""
                      ? f.review
                      : <span className="text-gray-400">No feedback</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ================= MOBILE / TABLET CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {filteredFeedbacks.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center text-gray-500">
            No feedback found
          </div>
        ) : (
          filteredFeedbacks.map((f, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow p-5 space-y-3"
            >
              <h3 className="text-xl font-bold">{f.name}</h3>

              <div className="flex items-center gap-1 text-yellow-500">
                {[...Array(f.rating || 0)].map((_, idx) => (
                  <Star
                    key={idx}
                    size={18}
                    className="fill-yellow-400"
                  />
                ))}
                {(f.rating == null || f.rating === 0) && "⭐ 0"}
              </div>

              <p className="text-gray-600">
                {f.review && f.review.trim() !== ""
                  ? f.review
                  : "No feedback"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentsFeedback;
