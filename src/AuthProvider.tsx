import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "./types/interface/auth-provider";
import { AccessTokenInfo } from "./types/interface/payload-types";
import { mapRefreshTokenPayload } from "./lib/mapper/account_logout";
import { mapAccessTokenInfo } from "./lib/mapper/update_access_token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUser: User | null = JSON.parse(sessionStorage.getItem("user") || "null");

  const [user, setUser] = useState<User | null>(initialUser);

  const setSignInSession = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem("user", JSON.stringify(userData))
  };

  const setLogOutSession = () => {
    setUser(null);
    sessionStorage.removeItem("user");
  }

  const setSessionRotation = async (userData: User | null): Promise<User | null> => {
    if (userData && Date.now() > (userData?.accessTokenExp * 1000)) {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/auth`, {
          method: "PUT",
          body: JSON.stringify(mapRefreshTokenPayload(userData?.refreshToken))
        })

        const { data } = await response.json();
        console.log("data:", data)

        if (response.status == 200) {
          const newAccessTokenInfo: AccessTokenInfo = mapAccessTokenInfo(data);
          userData.accessToken = newAccessTokenInfo.accessToken;
          userData.accessTokenIat = newAccessTokenInfo.accessTokenIat;
          userData.accessTokenExp = newAccessTokenInfo.accessTokenExp;
          setSignInSession(userData);
          return userData
        } else {
          console.error("Failed to refresh token. Response status:", response.status);
        }
      } catch (error) {
        console.error("Error in token rotation:", error);
      }
    }
    return userData
  }

  return (
    <AuthContext.Provider value={{ user, setSignInSession, setLogOutSession, setSessionRotation }}>
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