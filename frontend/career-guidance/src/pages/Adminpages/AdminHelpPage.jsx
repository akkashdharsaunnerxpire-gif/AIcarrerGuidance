import React from "react";
import {
  HelpCircle,
  User,
  Brain,
  Database,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

const AdminHelpPage = () => {
  const helpCards = [
    {
      title: "Manage Students",
      desc: "View registered students, their profiles, career predictions, and submitted reviews.",
      icon: <User className="text-indigo-600" />,
    },
    {
      title: "AI Career Predictions",
      desc: "AI analyzes student skills, personality, and interests to generate career recommendations.",
      icon: <Brain className="text-purple-600" />,
    },
    {
      title: "Data Management",
      desc: "All student data, predictions, and feedback are securely stored in the database.",
      icon: <Database className="text-green-600" />,
    },
    {
      title: "Student Feedback",
      desc: "Admins can review student ratings and feedback to improve AI accuracy.",
      icon: <MessageSquare className="text-pink-600" />,
    },
    {
      title: "Admin Security",
      desc: "Only authorized admins can access dashboards and management features.",
      icon: <ShieldCheck className="text-red-600" />,
    },
  ];

  return (
    <div className="min-h-screen ">
      <div className="max-w-6xl mx-auto  px-12 py-14">

        {/* HEADER */}
        <div className="text-center mb-14">
          <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full border-4 border-indigo-500 mb-4">
            <HelpCircle size={30} className="text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            Admin Help & Guide
          </h1>
          <p className="text-gray-500 mt-3 text-lg">
            Understand how to manage and operate the AI Career Guidance System
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {helpCards.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-5 bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-16 text-center text-sm text-gray-400">
          For system issues or AI improvements, contact the development team.
        </div>
      </div>
    </div>
  );
};

export default AdminHelpPage;
