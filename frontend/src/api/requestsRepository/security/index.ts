import { instance } from '../../index'
import { MeType } from '../../../types/me'
import { AxiosResponse } from 'axios'
import { LoginResponseType } from './types'

export const securityAPI = {
	login: (email: string, password: string): Promise<AxiosResponse<LoginResponseType>> => {
		return instance.post('/token/', { email, password })
	},
	getUserInfo: (): Promise<AxiosResponse<MeType>> => {
		return instance.get('/core/users/info/')
	},
	refreshToken(refresh: string) {
		return instance.post('/token/refresh/', { refresh })
	},
}
