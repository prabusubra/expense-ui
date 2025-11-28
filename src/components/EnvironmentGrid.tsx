import React from "react";
import { Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid"; // ✅ MUST BE THIS

export interface EnvRow {
  label: string;
  values: ("Yes" | "No")[];
}

export interface EnvGridProps {
  environments: string[];
  rows: EnvRow[];
}

export default function EnvironmentGrid({ environments, rows }: EnvGridProps) {
  return (
    <Paper sx={{ p: 2, maxWidth: 700 }}>
      <Grid container sx={{ mb: 2 }}>
        <Grid item xs={3} />
        {environments.map((env) => (
          <Grid item xs={3} key={env}>
            <Typography fontWeight="bold">{env}</Typography>
          </Grid>
        ))}
      </Grid>

      {rows.map((row) => (
        <Grid container key={row.label} sx={{ mb: 2 }}>
          <Grid item xs={3}>
            <Typography fontWeight="bold">{row.label}</Typography>
          </Grid>

          {row.values.map((v, i) => (
            <Grid item xs={3} key={i}>
              <Typography
                fontWeight="bold"
                color={v === "Yes" ? "green" : "red"}
              >
                {v}
              </Typography>
            </Grid>
          ))}
        </Grid>
      ))}
    </Paper>
  );
}
