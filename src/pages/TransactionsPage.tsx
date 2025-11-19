import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

const TransactionsPage = () => {
    return (
        <Box display="flex" flexDirection="column" gap={2}>
        <Box display="flex" gap={2}>
            <Box flex={1} bgcolor="primary.light" height={100} />
            <Box flex={2} bgcolor="secondary.light" height={100} />
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
            <Box height={100} bgcolor="primary.light" />
            <Box height={100} bgcolor="secondary.light" />
        </Box>
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height={200}
            bgcolor="grey.200"
            >
            <div>Centered Content</div>
        </Box>

        <Box
  display="flex"
  justifyContent="space-between"
  alignItems="center"
  width="100%"
>
  <div>Left Content</div>
  <div>Right Content</div>
</Box>


        </Box>
    );
};

export default TransactionsPage;