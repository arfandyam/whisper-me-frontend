import { UserAuthResponse } from "@/types/interface/response-types";

export const mapSignInField = ({
    id,
    username,
    first_name,
    last_name,
    email,
    is_oauth,
    is_verified,
    access_token,
    access_token_iat,
    access_token_exp,
    refresh_token,
}: UserAuthResponse) => ({
    id,
    username,
    firstName: first_name,
    lastName: last_name,
    email,
    isOauth: is_oauth,
    isVerified: is_verified,
    accessToken: access_token,
    accessTokenIat: access_token_iat,
    accessTokenExp: access_token_exp,
    refreshToken: refresh_token,
});