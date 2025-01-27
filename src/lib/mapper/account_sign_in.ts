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
    refresh_token_iat,
    refresh_token_exp
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
    refreshTokenIat: refresh_token_iat,
    refreshTokenExp: refresh_token_exp
});