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
}

export interface AuthContextType {
    user: User | null
    setSignInSession: (userData: User) => void;
    setLogOutSession: () => void;
}