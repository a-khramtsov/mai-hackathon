import { instance } from '../../index'
import { ApplicationType } from 'types/applications'
import { AxiosResponse } from 'axios'

export const applicationsAPI = {
	getApplications: (): Promise<AxiosResponse<Array<ApplicationType>>> => {
		return instance.get('/worker/applications/')
	},
	getApplication: (id: number): Promise<AxiosResponse<ApplicationType>> => {
		return instance.get(`/worker/applications/${id}/`)
	},
}
