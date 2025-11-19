// src/components/ChunkedTable.tsx
import React, { useMemo, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, TablePagination, CircularProgress, Box, Alert
} from "@mui/material";

import {
  useUsersChunk,
  UI_PAGE_SIZE,
  UI_PAGES_PER_CHUNK
} from "../hooks/useUsersChunk";

export default function ChunkedTable(): JSX.Element {
  const [page, setPage] = useState(0);

  const { data, isLoading, isFetching, error } = useUsersChunk(page);

  const pageRows = useMemo(() => {
    if (!data?.items) return [];
    const start = (page % UI_PAGES_PER_CHUNK) * UI_PAGE_SIZE;
    return data.items.slice(start, start + UI_PAGE_SIZE);
  }, [page, data]);

  const totalCount = data?.total ?? 0;

  return (
    <Paper>
      {error && <Alert severity="error">{(error as Error).message}</Alert>}

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box display="flex" justifyContent="center" py={3}>
                    <CircularProgress />
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                </TableRow>
              ))
            )}

            {isFetching && !isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Box display="flex" justifyContent="center" py={1}>
                    <CircularProgress size={20} />
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        rowsPerPage={UI_PAGE_SIZE}
        rowsPerPageOptions={[UI_PAGE_SIZE]}
        onPageChange={(_, newPage) => setPage(newPage)}
      />
    </Paper>
  );
}
