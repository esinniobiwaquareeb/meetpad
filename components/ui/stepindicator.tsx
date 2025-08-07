// components/StepIndicator.tsx

import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex  justify-between w-full mb-4">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col ">
            <span
              className={`text-sm font-medium ${
                index <= currentStep ? "text-primary" : "text-gray-600"
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
      <div className="flex  justify-between w-full">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex items-center">
            <div
              className={`flex items-center justify-center w-3 h-3 rounded-full ${
                index <= currentStep ? "bg-primary" : "bg-gray-300"
              }`}
            >

            </div>
            {index < steps.length - 1 && (
              <div
                className="flex-1 h-1 transition-colors duration-300 ease-in-out"
                style={{
                  backgroundColor: index < currentStep ? "#3b82f6" : "#d1d5db",
                }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
