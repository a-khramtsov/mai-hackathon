import React, { FC, useEffect, useState } from 'react'
import { Switch, RouteComponentProps, withRouter, useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import Application from './Application'
import { Block } from '../../Common/CustomComponents/Blocks'
import { ApplicationType } from 'types/applications'
import { applicationsAPI } from 'api'

interface RouteParams {
	id: string
}

type PropsType = {
	needRefresh?: boolean
	setNeedRefresh?: (needRefresh: boolean) => void
}

const ProjectContainer = ({ needRefresh, setNeedRefresh }: PropsType) => {
	const { id } = useParams<RouteParams>()
	const [application, setApplication] = useState<ApplicationType>({} as ApplicationType)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		getApplication()
	}, [id]);

	const getApplication = async () => {
		setLoading(true)
		const response = await applicationsAPI.getApplication(+id)
		if (response.status === 200) {
			setApplication(response.data)
		}
		setLoading(false)
	}

	useEffect(() => {
		if (needRefresh && setNeedRefresh) {
			getApplication()
			setNeedRefresh(false)
		}
	}, [needRefresh])


	const approve = async () => {
		const response = await applicationsAPI.approveApplication(application.id)
		if (response.status > 200 && response.status < 300) {
			if (setNeedRefresh) {
				setNeedRefresh(true)
			}
		}
	}

	const refuse = async () => {
		const response = await applicationsAPI.refuseApplication(application.id)
		if (response.status > 200 && response.status < 300) {
			if (setNeedRefresh) {
				setNeedRefresh(true)
			}
		}
	}


	return (
		<Block style={{ padding: 20 }} fullHeight={true}>
			<Application application={application} approve={approve} refuse={refuse} setNeedRefresh={setNeedRefresh} />
		</Block>

	)
}

export default ProjectContainer;
