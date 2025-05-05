"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = { id: string; name: string; email: string; role: string };
type SessionContextType = { user: User | null; isAdmin: boolean; loading: boolean };

const SessionContext = createContext<SessionContextType>({
  user: null,
  isAdmin: false,
  loading: true,
});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await fetch("/api/auth/verify");
        if (res.ok) {
          const data = await res.json();
          setUser(data.session);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, []);

  const isAdmin = user?.role === "admin";

  return (
    <SessionContext.Provider value={{ user, isAdmin, loading }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
