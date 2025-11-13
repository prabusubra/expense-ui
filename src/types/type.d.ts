export type YesNo = "yes" | "no";

export interface AccessRow {
  userType: string;
  dev: YesNo;
  production: YesNo;
  quality: YesNo;
}

export interface AccessMatrixForm {
  accessMatrix: AccessRow[];
}
