export const mapRefreshTokenPayload = (
    refreshToken
: string | undefined) => ({
    refresh_token: refreshToken,
});