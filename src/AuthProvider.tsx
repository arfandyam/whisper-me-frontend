import React, { createContext, useContext } from "react";
import { AuthContextType, User } from "./types/interface/auth-provider";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const setSignInSession = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
  };

  const setLogOutSession = () => {
    localStorage.removeItem("user");
  }

  return (
    <AuthContext.Provider value={{ setSignInSession, setLogOutSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}