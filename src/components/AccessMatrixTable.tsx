import React from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  TextField,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { useFormContext, useFieldArray } from "react-hook-form";
import { AccessMatrixForm } from "../types/type";

export default function AccessMatrixTable() {
  const { control, register, handleSubmit, watch } =
    useFormContext<AccessMatrixForm>();
  const { fields } = useFieldArray({ control, name: "accessMatrix" });

  const onSubmit = (data: AccessMatrixForm) => {
    console.log("📦 Submitted:", data);
    alert("✅ Configuration saved (check console)");
  };

  const watched = watch("accessMatrix");

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Access Matrix Configuration
      </Typography>

      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><b>User Type</b></TableCell>
              <TableCell align="center"><b>Dev</b></TableCell>
              <TableCell align="center"><b>Production</b></TableCell>
              <TableCell align="center"><b>Quality</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, rowIndex) => (
              <TableRow key={field.id}>
                <TableCell>{field.userType}</TableCell>

                {/* Dev column */}
                <TableCell align="center">
                  <TextField
                    select
                    size="small"
                    {...register(`accessMatrix.${rowIndex}.dev` as const)}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </TextField>
                </TableCell>

                {/* Production column */}
                <TableCell align="center">
                  <TextField
                    select
                    size="small"
                    {...register(`accessMatrix.${rowIndex}.production` as const)}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </TextField>
                </TableCell>

                {/* Quality column */}
                <TableCell align="center">
                  <TextField
                    select
                    size="small"
                    {...register(`accessMatrix.${rowIndex}.quality` as const)}
                  >
                    <MenuItem value="yes">Yes</MenuItem>
                    <MenuItem value="no">No</MenuItem>
                  </TextField>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>

      {/* Optional Debug Output */}
      <Box mt={3}>
        <Typography variant="body2" color="text.secondary">
          Current Values:
        </Typography>
        <pre>{JSON.stringify(watched, null, 2)}</pre>
      </Box>
    </Paper>
  );
}
