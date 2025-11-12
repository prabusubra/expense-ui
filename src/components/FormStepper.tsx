// src/components/FormStepper.tsx
import { Stepper, Step, StepLabel, Button, Box } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { formConfig } from "../config/formConfig";
import { StepRenderer } from "./StepRenderer";
import { useFormSteps } from "../hooks/useFormSteps";

export default function FormStepper() {
  const methods = useForm({ mode: "onBlur" });
  const { handleSubmit, trigger } = methods;
  const { activeStep, next, back, reset } = useFormSteps(formConfig.length);

  const onSubmit = (data: any) => {
    console.log("Final Data:", data);
    reset();
  };

  const handleNext = async () => {
    const valid = await trigger();
    if (valid) next();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {formConfig.map((step, i) => (
            <Step key={i}>
              <StepLabel>{step.title}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <StepRenderer step={formConfig[activeStep]} />

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button disabled={activeStep === 0} onClick={back}>
            Back
          </Button>

          {activeStep < formConfig.length - 1 ? (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </Box>
      </form>
    </FormProvider>
  );
}
