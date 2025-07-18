import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export interface User {
  id: string;
  email: string;
  name: string;
  photo_url?: string;
  role: "user" | "admin";
  verified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = async () => {
    setLoading(true);
    try {
      const res = await client.get("/api/auth/me", { withCredentials: true });
      const userData = res.data.data;
      setUser({
        ...userData,
        verified: Boolean(userData.verified),
      });
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  const logout = async () => {
    await client.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, checkSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
