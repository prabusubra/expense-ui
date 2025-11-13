import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { AccessMatrixForm } from "../types/type";
import { DEFAULT_ACCESS_MATRIX } from "../utils/constants";

export const RHFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const methods = useForm<AccessMatrixForm>({
    defaultValues: {
      accessMatrix: DEFAULT_ACCESS_MATRIX,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};
