// src/hooks/useFormSteps.ts
import { useState } from "react";

export const useFormSteps = (totalSteps: number) => {
  const [activeStep, setActiveStep] = useState(0);

  const next = () => setActiveStep((prev) => Math.min(prev + 1, totalSteps - 1));
  const back = () => setActiveStep((prev) => Math.max(prev - 1, 0));
  const reset = () => setActiveStep(0);

  return { activeStep, next, back, reset };
};
