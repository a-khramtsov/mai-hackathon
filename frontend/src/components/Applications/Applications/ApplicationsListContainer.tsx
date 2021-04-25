

import React, { FC, useEffect, useState } from 'react'
import s from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { FilterForRequestEnum, ApplicationType, ApplicationFiltersEnum } from 'types/applications'
import Filters from './components/Filters'
import ProjectsList from './ApplicationsList'

import { Block } from '../../Common/CustomComponents/Blocks'
import { applicationsAPI } from 'api'
import moment from 'moment'

type PropsTypes = {
	needRefresh?: boolean
	setNeedRefresh?: (needRefresh: boolean) => void
}


export type OptionsType = {
	status__in: Array<ApplicationFiltersEnum>
	end_time: string
}

const getStatusOption = (status: FilterForRequestEnum) => {
	let statuses = [] as Array<ApplicationFiltersEnum>
	switch (status) {
		case FilterForRequestEnum.NEW: {
			statuses = [ApplicationFiltersEnum.NEW, ApplicationFiltersEnum.APPROVED_BY_WORKER_BUT_NOT_BY_AIRLINE]
			break
		}
		case FilterForRequestEnum.APPROVED: {
			statuses = [ApplicationFiltersEnum.APPROVED_BY_AIRLINE, ApplicationFiltersEnum.APPROVED_BY_DISPATCHER]
			break
		}
		case FilterForRequestEnum.REFUSED: {
			statuses = [ApplicationFiltersEnum.REFUSED_BY_AIRLINE, ApplicationFiltersEnum.REFUSED_BY_DISPATCHER]
			break
		}
	}

	return statuses
}


const ApplicationsListContainer: FC<PropsTypes> = ({ needRefresh, setNeedRefresh, ...props }) => {
	const [loading, setLoading] = useState(false)
	const [applications, setApplications] = useState<Array<ApplicationType>>([])
	const [filter, setFilter] = useState(FilterForRequestEnum.NEW)



	useEffect(() => {
		getApplications()
	}, [filter])

	const getApplications = async () => {
		setLoading(true)
		const options = {} as OptionsType

		if (filter === FilterForRequestEnum.HISTORY) {
			options.end_time = moment().toISOString()
		} else {
			options.status__in = getStatusOption(filter)
		}

		const response = await applicationsAPI.getApplications(options)
		if (response.status === 200) {
			setApplications(response.data)
		}
		setLoading(false)
	}



	useEffect(() => {
		if (needRefresh && setNeedRefresh) {
			getApplications()
			setNeedRefresh(false)
		}
	}, [needRefresh])

	const approve = async (id: number) => {
		const response = await applicationsAPI.approveApplication(id)
		if (response.status > 200 && response.status < 300) {
			if (setNeedRefresh) {
				setNeedRefresh(true)
			} else {
				const tempApplications = applications.filter(application => application.id !== id)
				setApplications(tempApplications)
			}
		}
	}

	const refuse = async (id: number) => {
		const response = await applicationsAPI.refuseApplication(id)
		if (response.status > 200 && response.status < 300) {
			if (setNeedRefresh) {
				setNeedRefresh(true)
			} else {
				const tempApplications = applications.filter(application => application.id !== id)
				setApplications(tempApplications)
			}
		}
	}


	return (
		<Block fullHeight>
			<div className={s.projectsListBlock}>
				<Filters
					filter={filter}
					setFilter={setFilter}
				/>
				<ProjectsList applications={applications} approve={approve} refuse={refuse} />
			</div>
		</Block>

	)
}

export default ApplicationsListContainer;
