

import React, { FC, useEffect, useState } from 'react'
import s from './style.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { FilterForRequestEnum, ApplicationType } from 'types/applications'
import Search from './components/Search'
import Filters from './components/Filters'
import ProjectsList from './ApplicationsList'

import { Block } from '../../Common/CustomComponents/Blocks'
import { applicationsAPI } from 'api'

type PropsTypes = {

}



const ApplicationsListContainer: FC<PropsTypes> = ({ ...props }) => {
	const [loading, setLoading] = useState(false)
	const [applications, setApplications] = useState<Array<ApplicationType>>([])
	const [filter, setFilter] = useState(FilterForRequestEnum.NEW)
	const [searchText, setSearchText] = useState('')



	useEffect(() => {
		(async () => {
			const response = await applicationsAPI.getApplications()
			if (response.status === 200) {
				const data = [{ id: 1 } as ApplicationType]
				setApplications(data)

			}
		})()
	}, [filter, searchText])

	return (
		<Block fullHeight>
			<div className={s.projectsListBlock}>
				<Filters
					filter={filter}
					setFilter={setFilter}
				/>
				<Search
					searchText={searchText}
					setSearchText={setSearchText}
				/>
				<ProjectsList applications={applications} />
			</div>
		</Block>

	)
}

export default ApplicationsListContainer;
