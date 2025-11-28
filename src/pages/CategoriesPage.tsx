import { Chip, IconButton } from "@mui/material";
import GenericTable, { Column } from "../components/GenericTable";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EnvironmentGrid from "../components/EnvironmentGrid";

interface User {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
}

const CategoriesPage = () => {
  const columns: Column<User>[] = [
    { id: "name", label: "Name", minWidth: 150 },
    { id: "email", label: "Email", minWidth: 150 },

    {
      id: "status",
      label: "Status",
      render: (row) => (
        <Chip
          label={row.status}
          color={row.status === "Active" ? "success" : "warning"}
          size="small"
        />
      ),
    },

    {
      id: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <IconButton onClick={() => alert(`User ID: ${row.id}`)}>
          <MoreVertIcon />
        </IconButton>
      ),
    },
  ];

  const users: User[] = Array.from({ length: 200 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    status: Math.random() > 0.5 ? "Active" : "Inactive",
  }));

  return (
    <div>
      <EnvironmentGrid
        environments={["Pre-Dev", "Dev", "Prod"]}
        rows={[{ label: "Frontend", values: ["Yes", "No", "Yes"] }]}
      />
      <GenericTable<User> columns={columns} rows={users} />
    </div>
  );
};

export default CategoriesPage;
