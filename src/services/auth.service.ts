import { axiosStandard } from '@/api/interceptors'
import { IAuthResponse } from '@/types/auth.types'
import { removeAuthToken, setAuthToken } from './auth-token.service'

export const authService = {
	async login(username: string, password: string) {
		const response = await axiosStandard.post<IAuthResponse>('/auth/sign-in', {
			username,
			password
		})

		if (response.data?.accessToken) setAuthToken(response.data.accessToken)
		
		return response
	},
	async getNewToken() {
		const response = await axiosStandard.post<IAuthResponse>('/auth/refresh')
		
		if (response.data?.accessToken) setAuthToken(response.data.accessToken)
		
		return response
	},
	async logout() {
		const response = await axiosStandard.post<boolean>('/auth/sign-out')
		
		if (response.data) removeAuthToken()
		
		return response
	}
}