import React from "react";

interface StepperProps {
    steps: { title: string; }[];
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, setCurrentStep }) => {
    return (
        <div className="flex items-center justify-center mb-10">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center justify-center relative">
                    {/* Circle Button */}
                    <div className="flex flex-col items-center">
                        <button
                            onClick={() => setCurrentStep(index)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold text-white transition-colors duration-500 ease-in-out transform ${index < currentStep
                                ? "bg-purple-500 scale-110"
                                : index === currentStep
                                    ? "bg-gradient-to-br from-purple-500 to-pink-500"
                                    : "bg-slate-200 text-slate-500 hover:bg-slate-300"
                                }`}
                        >
                            {index + 1}
                        </button>

                        {/* Title */}
                        <div
                            className={`text-center absolute -bottom-5 mt-2 text-sm font-medium transition-colors duration-500 ease-in-out ${index < currentStep
                                ? "text-purple-500"
                                : index === currentStep
                                    ? "text-pink-500"
                                    : "text-slate-400"
                                }`}
                        >
                            {step.title}
                        </div>
                    </div>

                    {/* Line connecting the circles */}
                    {index < steps.length - 1 && (
                        <div
                            className={`h-0.5 w-24 mx-2 transition-all duration-300 ease-in-out ${index < currentStep
                                ? "bg-purple-500"
                                : "bg-slate-200"
                                }`}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
