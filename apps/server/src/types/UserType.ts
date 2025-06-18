export type User = {
  id: string;
  email: string;
  name: string;
  password_hash?: string;
  photo_url?: string;
  created_at?: Date;
  updated_at?: Date;
  role: "user" | "admin";
  active: boolean;
  last_login?: Date;
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
