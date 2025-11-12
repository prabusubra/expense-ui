// src/components/SectionAccordion.tsx
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Grid,
    Typography,
    Box,
    Divider,
  } from "@mui/material";
  import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DynamicField } from "./DynamicFields";
  
  export function SectionAccordion({ section }: any) {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">{section.accordionTitle}</Typography>
        </AccordionSummary>
  
        <AccordionDetails>
          <Grid container spacing={3}>
            {section.columns.map((col: any, i: number) => (
              <Grid container spacing={3}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {col.title}
                </Typography>
                <Divider sx={{ mb: 2 }} />
  
                {col.fields.map((field: any) => (
                  <Box key={field.name} sx={{ mb: 2 }}>
                    <DynamicField {...field} />
                  </Box>
                ))}
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    );
  }
  