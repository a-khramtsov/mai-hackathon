import { instance } from '../../index'
import { ApplicationType } from 'types/applications'
import { AxiosResponse } from 'axios'
import { OptionsType } from 'components/Applications/Applications/ApplicationsListContainer'
import queryString from 'query-string'

export const applicationsAPI = {
	getApplications: (options: OptionsType): Promise<AxiosResponse<Array<ApplicationType>>> => {
		const queryOptions = queryString.stringify(options, { arrayFormat: 'comma' })

		return instance.get('/airline/applications/' + '?' + queryOptions)
	},
	getApplication: (id: number): Promise<AxiosResponse<ApplicationType>> => {
		return instance.get(`/airline/applications/${id}/`)
	},
	approveApplication: (id: number): Promise<AxiosResponse<undefined>> => {
		return instance.get(`/airline/applications/${id}/approve/`)
	},
	refuseApplication: (id: number): Promise<AxiosResponse<undefined>> => {
		return instance.get(`/airline/applications/${id}/refuse/`)
	},
}
