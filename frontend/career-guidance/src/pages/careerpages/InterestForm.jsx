import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../components/Stepper";
import {
  Laptop,
  Palette,
  Stethoscope,
  Briefcase,
  Landmark,
  ArrowRight,
  Loader2,
} from "lucide-react";

/* CAREER DATA */
const careerOptions = {
  Technology: {
    showFor: "IT",
    icon: <Laptop className="text-indigo-600" />,
    items: [
      "AI / ML Engineer",
      "Data Scientist",
      "Web Developer",
      "Full Stack Developer",
      "Cyber Security Analyst",
      "Cloud Engineer",
    ],
  },
  Medical: {
    showFor: "OTHER",
    icon: <Stethoscope className="text-emerald-600" />,
    items: [
      "Doctor",
      "Nurse",
      "Medical Researcher",
      "Lab Technician",
      "Healthcare Analyst",
    ],
  },
  Creative: {
    showFor: "OTHER",
    icon: <Palette className="text-pink-600" />,
    items: [
      "UI/UX Designer",
      "Graphic Designer",
      "Animator",
      "Video Editor",
      "Game Designer",
    ],
  },
  Business: {
    showFor: "OTHER",
    icon: <Briefcase className="text-purple-600" />,
    items: [
      "Business Analyst",
      "Accountant",
      "Marketing Manager",
      "HR Manager",
      "Entrepreneur",
    ],
  },
  Government: {
    showFor: "OTHER",
    icon: <Landmark className="text-yellow-600" />,
    items: [
      "IAS / IPS",
      "Banking Officer",
      "Railway Officer",
      "Defence Services",
      "Government Teacher",
    ],
  },
};

const InterestForm = () => {
  const navigate = useNavigate();

  const [fieldType, setFieldType] = useState(null);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const toggleInterest = (category, item) => {
    setSelected((prev) => {
      const existing = prev[category] || [];
      const updated = existing.includes(item)
        ? existing.filter((i) => i !== item)
        : [...existing, item];

      return { ...prev, [category]: updated };
    });
  };

  const submit = () => {
    setLoading(true);

    localStorage.setItem("fieldType", fieldType);
    localStorage.setItem("interests", JSON.stringify(selected));

    setTimeout(() => {
      navigate("/personality-test");
    }, 1500);
  };

  const hasSelection = Object.values(selected).some((arr) => arr.length > 0);

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <>
        <Stepper currentStep={2} />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <Loader2
            size={48}
            className="animate-spin text-indigo-600 mb-4"
          />
          <h2 className="text-xl font-semibold">
            Preparing Personality Test…
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            AI is setting up questions for you
          </p>
        </div>
      </>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <>
      <Stepper currentStep={2} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center px-4">
        <div className="w-full max-w-6xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
          {/* TITLE */}
          <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Career Interest Selection
          </h2>
          <p className="text-center text-gray-500 mb-10">
            Choose what excites you — AI will personalize the journey
          </p>

          {/* STEP 1 – FIELD TYPE */}
          {!fieldType && (
            <div className="grid md:grid-cols-2 gap-8">
              <button
                onClick={() => setFieldType("IT")}
                className="
                  group p-10 rounded-2xl border
                  bg-white hover:bg-indigo-50
                  transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  text-center
                "
              >
                <Laptop size={48} className="mx-auto mb-4 text-indigo-600" />
                <h3 className="text-2xl font-bold">IT / Technology</h3>
                <p className="text-gray-500 mt-2">
                  Software, AI, Data, Cyber, Cloud
                </p>
              </button>

              <button
                onClick={() => setFieldType("OTHER")}
                className="
                  group p-10 rounded-2xl border
                  bg-white hover:bg-purple-50
                  transition-all duration-300
                  hover:scale-105 hover:shadow-xl
                  text-center
                "
              >
                <Briefcase size={48} className="mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold">Other Fields</h3>
                <p className="text-gray-500 mt-2">
                  Medical, Business, Creative, Government
                </p>
              </button>
            </div>
          )}

          {/* STEP 2 – INTEREST SELECTION */}
          {fieldType && (
            <>
              <div className="space-y-10">
                {Object.entries(careerOptions)
                  .filter(([, d]) => d.showFor === fieldType)
                  .map(([category, data]) => (
                    <div key={category}>
                      <h3 className="flex items-center gap-3 text-2xl font-semibold mb-4 text-gray-800">
                        {data.icon}
                        {category}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {data.items.map((item) => {
                          const active =
                            selected[category]?.includes(item);

                          return (
                            <button
                              key={item}
                              onClick={() =>
                                toggleInterest(category, item)
                              }
                              className={`
                                px-4 py-3 rounded-xl text-sm font-medium
                                border transition-all duration-300
                                ${
                                  active
                                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105"
                                    : "bg-gray-50 hover:bg-gray-100"
                                }
                              `}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>

              {/* CONTINUE */}
              <button
                disabled={!hasSelection}
                onClick={submit}
                className={`
                  mt-12 w-full flex items-center justify-center gap-2
                  py-4 rounded-xl text-lg font-bold
                  transition-all
                  ${
                    hasSelection
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:scale-[1.02]"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }
                `}
              >
                Continue to Personality Test
                <ArrowRight />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InterestForm;
