export interface StatusMessageResponse {
    status: string
    message: string
}

export interface UserAuthResponse {
    id: string
    username: string
    first_name: string
    last_name: string
    email: string
    is_oauth: boolean
    is_verified: boolean
    access_token: string
    access_token_iat: number
    access_token_exp: number
    refresh_token: string
    refresh_token_iat: number
    refresh_token_exp: number
}

export interface UpdateAccessTokenJSON {
    access_token: string
    access_token_iat: number
    access_token_exp: number
}

export interface TSessionRotationResponse {
    status: string
    message: string
    data?: UpdateAccessTokenJSON
    description?: string
}