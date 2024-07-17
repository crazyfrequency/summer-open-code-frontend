import { Role } from "./enums"

export interface IAuthResponse {
	accessToken: string
}

export type TUserTokenData = {
	id: number
	sub: string
	role: Role
	iat: number
	exp: number
}
