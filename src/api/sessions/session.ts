import { mapRefreshTokenPayload } from "@/lib/mapper/account_logout"
import { User } from "@/types/interface/auth-provider";
import { AuthUser } from "@/types/interface/payload-types";

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
