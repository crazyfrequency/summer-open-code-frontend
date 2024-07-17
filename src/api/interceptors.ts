import { SITE_DOMAIN_API } from '@/constants/seo.constants'
import axios, { type CreateAxiosDefaults } from 'axios'
import { errorCatch } from './error'
import { getAuthToken, removeAuthToken } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: SITE_DOMAIN_API,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosStandard = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAuthToken()

	if (config?.headers && accessToken)
		config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewToken()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeAuthToken()
			}
		}

		return error?.response ?? error
	}
)

axiosStandard.interceptors.response.use(
	config => config,
	error => error?.response ?? error
)

export { axiosStandard, axiosWithAuth }