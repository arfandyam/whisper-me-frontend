import { UpdateAccessTokenResponse } from "@/types/interface/response-types";

export const mapAccessTokenInfo = ({
    access_token_iat,
    access_token_exp,
    access_token,
}: UpdateAccessTokenResponse) => ({
    accessToken: access_token,
    accessTokenIat: access_token_iat,
    accessTokenExp: access_token_exp,
});