import { useAdmin } from "../../context/AdminContext";
import { useEffect, useState } from "react";
import AdvancedLoader from "../../components/AdvancedLoader";
import { Users, Search, Mail, GraduationCap, Calendar } from "lucide-react";

const StudentsProfile = () => {
  const { students, loading, refreshStudents } = useAdmin();

  const [pageLoading, setPageLoading] = useState(true);
  const [search, setSearch] = useState("");

  // ✅ PAGE ENTER → DATA REFRESH
  useEffect(() => {
    refreshStudents(); // API call → latest data
    const timer = setTimeout(() => setPageLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || pageLoading) {
    return <AdvancedLoader text="Loading students profiles..." />;
  }

  const filteredStudents = students.filter((s) =>
    `${s.name} ${s.email} ${s.department}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex items-center gap-2">
          <Users className="text-indigo-600" />
          <h1 className="text-3xl font-bold">Students Profiles</h1>
        </div>

        <div className="relative w-full lg:w-80">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students..."
            className="w-full pl-10 py-2.5 border rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Year</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((s, i) => (
              <tr key={s.uuid} className="border-t hover:bg-gray-50">
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-semibold">{s.name}</td>
                <td className="p-4 text-indigo-600">{s.email}</td>
                <td className="p-4">{s.department}</td>
                <td className="p-4">{s.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsProfile;
