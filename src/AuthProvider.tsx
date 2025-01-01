import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "./types/interface/auth-provider";

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialUser = JSON.parse(sessionStorage.getItem("user") || "null");
    const [user, setUser] = useState<User | null>(initialUser);

    const setSignInSession = (userData: User) => {
        setUser(userData);
        sessionStorage.setItem("user", JSON.stringify(userData))
    };

    const setLogOutSession = () => {
        setUser(null);
        sessionStorage.removeItem("user")
    }

    return (
        <AuthContext.Provider value={{ user, setSignInSession, setLogOutSession }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext)
    if (!context){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}