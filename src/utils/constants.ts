import { AccessRow } from "../types/type";

export const DEFAULT_ACCESS_MATRIX: AccessRow[] = [
  { userType: "Internal", dev: "yes", production: "no", quality: "yes" },
  { userType: "External", dev: "no", production: "no", quality: "no" },
  { userType: "Contract", dev: "yes", production: "yes", quality: "no" },
];
