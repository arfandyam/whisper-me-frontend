import { StatusMessageResponse } from "../response-types"

export interface UserData {
    id: string
    username: string
    first_name: string
    last_name: string
    email: string
}

export interface FindUserById extends StatusMessageResponse {
    data: UserData
}