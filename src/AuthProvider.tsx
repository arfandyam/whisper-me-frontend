import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, User } from "./types/interface/auth-provider";
import { AccessTokenInfo } from "./types/interface/payload-types";
import { mapAccessTokenInfo } from "./lib/mapper/update_access_token";
import { TSessionRotationResponse } from "./types/interface/response-types";
import { logOut, updateAccessToken } from "./api/sessions/session";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUser: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const queryClient = useQueryClient();
  const [user, setUser] = useState<User | null>(initialUser);
  const [sessionChecked, setsessionChecked] = useState<boolean>(false);

  const setSignInSession = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData);
  };

  const setLogOutSession = () => {
    localStorage.removeItem("user");
    setUser(null);
  }

  const checkSession = async () => {
    console.log("user pada saat di check", user)
    if (user && Date.now() > (user.refreshTokenExp * 1000)) {
      try {
        logOut(user.refreshToken);
        setUser(null);
        localStorage.removeItem("user");
      } catch (e) {
        console.error("Failed to logout. Error:", e)
      }
    }

    if (user && Date.now() > (user.accessTokenExp * 1000)) {
      try {
        const response = await updateAccessToken(user);
        const sessionRotationResponse: TSessionRotationResponse = await response.json();

        if (response.status == 200 && sessionRotationResponse.data) {
          const { data } = sessionRotationResponse
          const newAccessTokenInfo: AccessTokenInfo = mapAccessTokenInfo(data);
          const updatedUser = { ...user, ...newAccessTokenInfo }
          setSignInSession(updatedUser);
          queryClient.invalidateQueries();
          console.log("user saat di check dan access token expire", user)
        } else if (response.status == 400) {
          console.error(`Failed to refresh access token. message: ${sessionRotationResponse.message}`);
          logOut(user.refreshToken);
          setLogOutSession();
        }
      } catch (error) {
        console.error("Error in token rotation:", error);
        logOut(user.refreshToken);
        setLogOutSession();
      }
    }

    setsessionChecked(true);
  }

  useEffect(() => {
    checkSession();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, sessionChecked, setSignInSession, setLogOutSession }}>
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