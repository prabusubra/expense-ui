// src/components/DynamicField.tsx
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
  } from "@mui/material";
  import { useFormContext, Controller } from "react-hook-form";
  
  export const DynamicField = ({ name, label, type, options = [], required }: any) => {
    const { register, control } = useFormContext();
  
    switch (type) {
      case "text":
      case "email":
      case "number":
        return (
          <TextField
            label={label}
            type={type}
            {...register(name, { required })}
            fullWidth
            margin="dense"
          />
        );
  
      case "textarea":
        return (
          <TextField
            label={label}
            {...register(name, { required })}
            fullWidth
            margin="dense"
            multiline
            rows={3}
          />
        );
  
      case "select":
        return (
          <FormControl fullWidth margin="dense">
            <InputLabel>{label}</InputLabel>
            <Controller
              control={control}
              name={name}
              rules={{ required }}
              render={({ field }) => (
                <Select {...field} label={label}>
                  {options.map((opt: any) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        );
  
      case "checkbox":
        return <FormControlLabel control={<Checkbox {...register(name)} />} label={label} />;
  
      default:
        return null;
    }
  };
  