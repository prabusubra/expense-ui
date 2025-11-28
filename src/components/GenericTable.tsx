import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
} from "@mui/material";

export interface Column<T> {
  id: keyof T | string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: any) => string;
  render?: (row: T) => React.ReactNode;
}

interface Props<T> {
  columns: Column<T>[];
  rows: T[];

  /* Hybrid pagination props */
  externalPage?: number;
  onExternalPageChange?: (page: number) => void;
  externalRowsPerPage?: number;
  onExternalRowsPerPageChange?: (event: React.ChangeEvent<any>) => void;
  externalTotalCount?: number;

  /* Selection */
  selected?: (string | number)[];
  onSelectionChange?: (ids: (string | number)[]) => void;

  height?: number | string;
}

export default function GenericTable<T extends { id: string | number }>(props: Props<T>) {
  const {
    columns,
    rows,
    height = 440,

    externalPage,
    externalRowsPerPage,
    externalTotalCount,
    onExternalPageChange,
    onExternalRowsPerPageChange,

    selected,
    onSelectionChange,
  } = props;

  /* Internal pagination fallback */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const pageValue = externalPage ?? page;
  const rowsPerPageValue = externalRowsPerPage ?? rowsPerPage;

  /* Internal selection fallback */
  const [internalSelected, setInternalSelected] = useState<(string | number)[]>([]);
  const selectedValue = selected ?? internalSelected;

  const handleSelectAll = (checked: boolean) => {
    const allIds = rows.map((r) => r.id);
    const newSel = checked ? allIds : [];
    onSelectionChange ? onSelectionChange(newSel) : setInternalSelected(newSel);
  };

  const toggleRow = (id: string | number) => {
    const exists = selectedValue.includes(id);
    const updated = exists
      ? selectedValue.filter((x) => x !== id)
      : [...selectedValue, id];

    onSelectionChange ? onSelectionChange(updated) : setInternalSelected(updated);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: height }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selectedValue.length > 0 && selectedValue.length < rows.length
                  }
                  checked={rows.length > 0 && selectedValue.length === rows.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </TableCell>

              {columns.map((column) => (
                <TableCell key={String(column.id)} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow
                hover
                key={row.id}
                selected={selectedValue.includes(row.id)}
                onClick={() => toggleRow(row.id)}
              >
                <TableCell padding="checkbox">
                  <Checkbox checked={selectedValue.includes(row.id)} />
                </TableCell>

                {columns.map((column) => {
                  const val = row[column.id as keyof T];
                  return (
                    <TableCell key={String(column.id)} align={column.align}>
                      {column.render
                        ? column.render(row)
                        : column.format
                        ? column.format(val)
                        : (val as React.ReactNode)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* HYBRID PAGINATION */}
      <TablePagination
        component="div"
        page={pageValue}
        rowsPerPage={rowsPerPageValue}
        rowsPerPageOptions={[10, 25, 50]}
        count={externalTotalCount ?? rows.length}
        onPageChange={(_, newPage) => {
          if (externalPage != null) onExternalPageChange?.(newPage);
          else setPage(newPage);
        }}
        onRowsPerPageChange={(e) => {
          if (externalRowsPerPage != null) onExternalRowsPerPageChange?.(e);
          else {
            setRowsPerPage(+e.target.value);
            setPage(0);
          }
        }}
      />
    </Paper>
  );
}
