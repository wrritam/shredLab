import { useAuthStore } from "@/store";
import React, { createContext, useContext, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
}
interface AuthProviderProps {
   children: ReactNode;
 }


const AuthContext = createContext<AuthContextType>({ isAuthenticated: false });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return <AuthContext.Provider value={{ isAuthenticated }}>{children}</AuthContext.Provider>;
};
