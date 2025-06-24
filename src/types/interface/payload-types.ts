export interface AuthUser {
    username: string
    password: string
}

export interface UserRegistration {
    firstName: string
    lastName: string
    username: string
    email: string
    password: string
}

export interface LogoutUser {
    refreshToken : string | undefined
}

export interface AccessTokenInfo {
    accessToken: string
    accessTokenIat: number
    accessTokenExp: number
}