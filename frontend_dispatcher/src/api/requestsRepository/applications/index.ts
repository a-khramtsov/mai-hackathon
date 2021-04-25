import { instance } from '../../index'
import { ApplicationType } from 'types/applications'
import { AxiosResponse } from 'axios'
import { OptionsType } from 'components/Applications/Applications/ApplicationsListContainer'
import queryString from 'query-string'

export const applicationsAPI = {
	getApplications: (options: OptionsType): Promise<AxiosResponse<Array<ApplicationType>>> => {
		const queryOptions = queryString.stringify(options, { arrayFormat: 'comma' })

		return instance.get('/dispatcher/applications/' + '?' + queryOptions)
	},
	getApplication: (id: number): Promise<AxiosResponse<ApplicationType>> => {
		return instance.get(`/dispatcher/applications/${id}/`)
	},
	editApplication(application: ApplicationType) {
		const { id, ...restApplication } = application
		return instance.patch(`/dispatcher/applications/${id}/`, restApplication)
	},
	approveApplication: (id: number): Promise<AxiosResponse<undefined>> => {
		return instance.get(`/dispatcher/applications/${id}/approve/`)
	},
	refuseApplication: (id: number): Promise<AxiosResponse<undefined>> => {
		return instance.get(`/dispatcher/applications/${id}/refuse/`)
	},
	setEstimation: (id: number, val: number): Promise<AxiosResponse<undefined>> => {
		return instance.post(`/dispatcher/applications/${id}/estimate/`, { estimation: val })
	},
}
