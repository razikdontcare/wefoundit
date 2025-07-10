export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: "active" | "inactive";
  role: "user" | "admin";
};
