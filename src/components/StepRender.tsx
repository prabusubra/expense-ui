// src/components/StepRenderer.tsx
import { Box, Typography } from "@mui/material";
import { SectionAccordion } from "./SectionAccordion";

export function StepRenderer({ step }: any) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {step.title}
      </Typography>

      {step.sections.map((section: any, idx: number) => (
        <SectionAccordion key={idx} section={section} />
      ))}
    </Box>
  );
}
