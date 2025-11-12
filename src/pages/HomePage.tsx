import { useState, type JSX } from "react";
import Typography from "@mui/material/Typography";
import Chips from "../components/Chips";
import { Stack } from "@mui/material";

export default function HomePage(): JSX.Element {

  const [creditsChip, setCreditChip] = useState(false);
  const [debtChip, setDebtChip] = useState(false);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Home
      </Typography>
      <Typography paragraph>
        Welcome to the Personal Expense Management App.
      </Typography>
      <Stack direction="row" spacing={1}>
          <Chips current={creditsChip} handleClick = {() => setCreditChip(prev => !prev)} label="Credits" />
          <Chips current={debtChip} handleClick = {() => setDebtChip(prev => !prev)} label="Debt" />
      </Stack>
    </>
  );
}
