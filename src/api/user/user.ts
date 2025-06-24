import { FindUserById } from "@/types/interface/users/user-types"

export const findUserById = async (userId: string | undefined): Promise<FindUserById> => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_PROTOCOL}://${import.meta.env.VITE_BACKEND_HOST}:${import.meta.env.VITE_BACKEND_PORT}/user/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })

    const user: FindUserById = await response.json();

    return user
}