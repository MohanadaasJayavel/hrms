export type Role = "employee" | "manager" | "hr_admin";

export interface AuthUser {
  id: number;
  role: Role;
  email: string;
}