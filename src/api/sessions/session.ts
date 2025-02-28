import { mapRefreshTokenPayload } from "@/lib/mapper/account_logout"
import { mapAccessTokenInfo } from "@/lib/mapper/update_access_token";
import { User } from "@/types/interface/auth-provider";
import { AccessTokenInfo, AuthUser } from "@/types/interface/payload-types";
import { TSessionRotationResponse } from "@/types/interface/response-types";

export const logOut = async (refreshToken: string | undefined): Promise<Response> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/auth`, {
        method: "DELETE",
        body: JSON.stringify(mapRefreshTokenPayload(refreshToken))
    })

    return response;
}

export const logIn = async ({ username, password }: AuthUser): Promise<Response> => {
    const userCredentials = JSON.stringify({
        username,
        password
    });
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/auth`, {
        body: userCredentials,
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
    })

    return response;
}

export const updateAccessToken = async (userData: User): Promise<Response> => {

    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/auth`, {
        method: "PUT",
        body: JSON.stringify(mapRefreshTokenPayload(userData.refreshToken))
    })

    return response;
}

export const checkSession = async (user: User | null): Promise<User | null> => {
    if (user && Date.now() > (user.refreshTokenExp * 1000)) {
        try {
            logOut(user.refreshToken);
            // setUser(null);
            localStorage.removeItem("user");
            return null
        } catch (e) {
            console.error("Failed to logout. Error:", e);
            return null
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
                // setSignInSession(updatedUser);
                localStorage.setItem("user", JSON.stringify(updatedUser));
                console.log("user saat di check dan access token expire", user)
                return updatedUser;
            } else if (response.status == 400) {
                console.error(`Failed to refresh access token. message: ${sessionRotationResponse.message}`);
                logOut(user.refreshToken);
                localStorage.removeItem("user");
                return null
            }
        } catch (error) {
            console.error("Error in token rotation:", error);
            logOut(user.refreshToken);
            localStorage.removeItem("user");
        }
    }

    return user
}
