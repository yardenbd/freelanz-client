import React, { createContext, useContext, useState, ReactNode } from "react";

interface StepsContextType {
    currentStep: number;
    totalSteps: number;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
}

const StepsContext = createContext<StepsContextType | undefined>(undefined);

export const StepsProvider = ({ children }: { children: ReactNode }) => {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const totalSteps = 5;

    const nextStep = () => {
        setCurrentStep((prev) => (prev < totalSteps ? prev + 1 : prev));
    };

    const prevStep = () => {
        setCurrentStep((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const goToStep = (step: number) => {
        if (step >= 1 && step <= totalSteps) {
            setCurrentStep(step);
        }
    };

    return (
        <StepsContext.Provider
            value={{ currentStep, totalSteps, nextStep, prevStep, goToStep }}
        >
            {children}
        </StepsContext.Provider>
    );
};

export const useSteps = () => {
    const context = useContext(StepsContext);
    if (!context) {
        throw new Error("useSteps must be used within a StepsProvider");
    }
    return context;
};
