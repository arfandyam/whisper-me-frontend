import { LogoutUser } from "@/types/interface/payload-types";

export const mapLogoutPayload = ({
    refreshToken
}: LogoutUser) => ({
    refresh_token: refreshToken,
});