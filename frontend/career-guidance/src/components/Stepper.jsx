import { Check } from "lucide-react";

const steps = [
  "Field",
  "Interests",
  "Personality",
  "Skills",
  "Analyze",
];

const Stepper = ({ currentStep }) => {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((label, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber <= currentStep;
            const isActive = stepNumber === currentStep;

            return (
              <div
                key={label}
                className="flex-1 flex items-center last:flex-none"
              >
                {/* CIRCLE */}
                <div className="flex flex-col items-center relative">
                  <div
                    className={`w-9 h-9 flex items-center justify-center rounded-full font-semibold text-sm
                      ${
                        isCompleted
                          ? "bg-green-600 text-white"
                          : isActive
                          ? "bg-green-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }
                    `}
                  >
                    {isCompleted ? <Check size={18} /> : stepNumber}
                  </div>

                  {/* LABEL */}
                  <span
                    className={`mt-2 text-xs font-medium
                      ${
                        isCompleted || isActive
                          ? "text-green-600"
                          : "text-gray-400"
                      }
                    `}
                  >
                    {label}
                  </span>
                </div>

                {/* LINE */}
                {index !== steps.length - 1 && (
                  <div
                    className={`flex-1 h-[3px] mx-2 rounded-full
                      ${
                        stepNumber < currentStep
                          ? "bg-green-600"
                          : "bg-gray-200"
                      }
                    `}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
