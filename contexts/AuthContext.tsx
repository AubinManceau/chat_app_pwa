"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  pseudo: string | null;
  setPseudo: (pseudo: string | null) => void;
  clearUser: () => void;
  registerUser: (newPseudo: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [pseudo, setPseudo] = useState<string | null>(null);

  useEffect(() => {
    const storedPseudo = localStorage.getItem("pseudo");
    setPseudo(storedPseudo);
  }, []);

  const clearUser = () => {
    localStorage.removeItem("pseudo");
    setPseudo(null);
  };

  const registerUser = (newPseudo: string) => {
    localStorage.setItem("pseudo", newPseudo);
    setPseudo(newPseudo);
  }

  return (
    <AuthContext.Provider value={{ pseudo, setPseudo, clearUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
   return useContext(AuthContext) as AuthContextType;
}
