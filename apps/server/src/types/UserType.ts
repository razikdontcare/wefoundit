export type User = {
  id: string;
  email: string;
  name: string;
  passwordHash?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  role: "user" | "admin";
  active: boolean;
  lastLogin?: Date;
  providers: Array<"google" | "email">;
};

export type RegisterUser = Omit<
  User,
  | "id"
  | "createdAt"
  | "updatedAt"
  | "role"
  | "active"
  | "providers"
  | "passwordHash"
> & {
  password: string;
};
