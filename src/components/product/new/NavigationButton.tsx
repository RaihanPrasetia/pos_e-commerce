// components/NavigationButtons.tsx

import React from "react";

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    handlePrevious: () => void;
    handleNext: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    currentStep,
    totalSteps,
    handlePrevious,
    handleNext,
}) => {
    return (
        <div className="flex justify-between mt-6">
            <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentStep === 0
                    ? "bg-gray-200 text-gray-400  cursor-not-allowed"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
            >
                Previous
            </button>
            <button
                onClick={handleNext}
                disabled={currentStep === totalSteps - 1}
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentStep === totalSteps - 1
                    ? "hidden"
                    : "bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-md hover:opacity-90"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default NavigationButtons;
