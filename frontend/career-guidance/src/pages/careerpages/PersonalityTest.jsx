import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Stepper from "../../components/Stepper";
import { ArrowRight, Loader2 } from "lucide-react";

const questions = [
  {
    question: "When solving a problem, you usually:",
    options: [
      { text: "Analyze data and logic", trait: "Analytical" },
      { text: "Think creatively", trait: "Creative" },
      { text: "Discuss with others", trait: "Social" },
      { text: "Take leadership", trait: "Leadership" },
      { text: "Build or experiment", trait: "Practical" },
    ],
  },
  {
    question: "You enjoy work that involves:",
    options: [
      { text: "Numbers & patterns", trait: "Analytical" },
      { text: "Design & imagination", trait: "Creative" },
      { text: "Helping people", trait: "Social" },
      { text: "Managing teams", trait: "Leadership" },
      { text: "Hands-on tools", trait: "Practical" },
    ],
  },
  {
    question: "In a group project, you usually:",
    options: [
      { text: "Plan & analyze", trait: "Analytical" },
      { text: "Suggest new ideas", trait: "Creative" },
      { text: "Coordinate with team", trait: "Social" },
      { text: "Lead the group", trait: "Leadership" },
      { text: "Handle implementation", trait: "Practical" },
    ],
  },
  {
    question: "Which excites you most?",
    options: [
      { text: "Solving complex problems", trait: "Analytical" },
      { text: "Creating something new", trait: "Creative" },
      { text: "Interacting with people", trait: "Social" },
      { text: "Making decisions", trait: "Leadership" },
      { text: "Working with machines", trait: "Practical" },
    ],
  },
  {
    question: "Your strength is:",
    options: [
      { text: "Logical thinking", trait: "Analytical" },
      { text: "Original ideas", trait: "Creative" },
      { text: "Communication", trait: "Social" },
      { text: "Confidence", trait: "Leadership" },
      { text: "Technical skills", trait: "Practical" },
    ],
  },
];

const PersonalityTest = () => {
  const navigate = useNavigate();

  const [currentQ, setCurrentQ] = useState(0);
  const [loading, setLoading] = useState(false);

  const [scores, setScores] = useState({
    Analytical: 0,
    Creative: 0,
    Social: 0,
    Leadership: 0,
    Practical: 0,
  });

  const progress = ((currentQ + 1) / questions.length) * 100;

  const handleAnswer = (trait) => {
    const updatedScores = {
      ...scores,
      [trait]: scores[trait] + 1,
    };

    setScores(updatedScores);

    if (currentQ < questions.length - 1) {
      setTimeout(() => setCurrentQ((q) => q + 1), 200);
    } else {
      const finalTrait = Object.keys(updatedScores).reduce((a, b) =>
        updatedScores[a] > updatedScores[b] ? a : b
      );

      localStorage.setItem(
        "personalityResult",
        JSON.stringify({
          finalTrait,
          scores: updatedScores,
        })
      );

      // ✅ SHOW LOADING BEFORE NAVIGATION
      setLoading(true);

      setTimeout(() => {
        navigate("/career-form");
      }, 1500);
    }
  };

  /* ================= LOADING SCREEN ================= */
  if (loading) {
    return (
      <>
        <Stepper currentStep={3} />
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
          <Loader2
            size={48}
            className="animate-spin text-indigo-600 mb-4"
          />
          <h2 className="text-xl font-semibold">
            Analyzing your personality…
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            AI is preparing your skill assessment
          </p>
        </div>
      </>
    );
  }

  /* ================= MAIN UI ================= */
  return (
    <>
      <Stepper currentStep={3} />

      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10">
          {/* TITLE */}
          <h2 className="text-4xl font-bold text-center mb-2 text-gray-800">
            Personality Assessment
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Answer honestly — AI identifies your strengths
          </p>

          {/* PROGRESS */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>
                Question {currentQ + 1} of {questions.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* QUESTION */}
          <p className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            {questions[currentQ].question}
          </p>

          {/* OPTIONS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {questions[currentQ].options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(opt.trait)}
                className="
                  group p-5 rounded-2xl border
                  bg-white hover:bg-gradient-to-r
                  hover:from-indigo-600 hover:to-purple-600
                  hover:text-white
                  transition-all duration-300
                  shadow hover:shadow-xl
                  text-left flex justify-between items-center
                "
              >
                <span className="text-lg font-medium">{opt.text}</span>
                <ArrowRight className="opacity-0 group-hover:opacity-100 transition" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalityTest;
