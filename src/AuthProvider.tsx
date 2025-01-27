import React, { createContext, useContext, useState } from "react";
import { AuthContextType, User } from "./types/interface/auth-provider";
import { AccessTokenInfo } from "./types/interface/payload-types";
import { mapAccessTokenInfo } from "./lib/mapper/update_access_token";
import { TSessionRotationResponse } from "./types/interface/response-types";
import { logOut, updateAccessToken } from "./api/sessions/session";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const initialUser: User | null = JSON.parse(localStorage.getItem("user") || "null");

  const [user, setUser] = useState<User | null>(initialUser);

  const setSignInSession = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData))
  };

  const setLogOutSession = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const setSessionRotation = async (userData: User | null): Promise<User | null> => {
    console.log("userData:", userData)
    if (userData && Date.now() > (userData.refreshTokenExp * 1000)) {
      try {
        logOut(userData.refreshToken);
        setUser(null);
        localStorage.removeItem("user");
      } catch (e) {
        console.error("Failed to logout. Error:", e)
      }

      return null
    } 
    if (userData && Date.now() > (userData?.accessTokenExp * 1000)) {
      try {
        const response = await updateAccessToken(userData)
        const sessionRotationResponse: TSessionRotationResponse = await response.json();

        if (response.status == 200 && sessionRotationResponse.data) {
          const { data } = sessionRotationResponse
          const newAccessTokenInfo: AccessTokenInfo = mapAccessTokenInfo(data);
          userData.accessToken = newAccessTokenInfo.accessToken;
          userData.accessTokenIat = newAccessTokenInfo.accessTokenIat;
          userData.accessTokenExp = newAccessTokenInfo.accessTokenExp;
          setSignInSession(userData);
          return userData
        } else if (response.status == 400) {
          console.error(`Failed to refresh access token. message: ${sessionRotationResponse.message}`);
          logOut(userData.refreshToken);
          setUser(null);
          localStorage.removeItem("user");
          return null
        }
      } catch (error) {
        console.error("Error in token rotation:", error);
        logOut(userData.refreshToken);
        setUser(null);
        localStorage.removeItem("user");
        return null
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