export interface User {
    id: string
    username: string
    firstName: string
    lastName: string
    email: string
    isOauth: boolean
    isVerified: boolean
    accessToken: string
    accessTokenIat: number
    accessTokenExp: number
    refreshToken: string
    refreshTokenIat: number
    refreshTokenExp: number
}

export interface AuthContextType {
    user: User | null
    sessionChecked: boolean
    setSignInSession: (userData: User) => void;
    setLogOutSession: () => void;
}