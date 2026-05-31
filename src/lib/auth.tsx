import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "jobseeker" | "employer";

export interface MfjUser {
  role: Role;
  name: string;
  email: string;
  company?: string;
}

const KEY = "mfj_user";

interface AuthCtx {
  user: MfjUser | null;
  ready: boolean;
  login: (u: MfjUser) => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MfjUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login = (u: MfjUser) => {
    localStorage.setItem(KEY, JSON.stringify(u));
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(KEY);
    setUser(null);
  };

  return <Ctx.Provider value={{ user, ready, login, logout }}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used within AuthProvider");
  return c;
}

export const SAMPLE_ACCOUNTS = {
  jobseeker: { email: "aisha@demo.my", password: "demo123", name: "Aisha Rahman" },
  employer: { email: "hr@petrasoft.my", password: "demo123", name: "Farah Lim", company: "PetraSoft Sdn Bhd" },
};