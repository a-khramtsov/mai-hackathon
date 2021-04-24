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

const ProjectContainer = () => {
	const { id } = useParams<RouteParams>()
	const [application, setApplication] = useState<ApplicationType>({} as ApplicationType)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		(async () => {
			setLoading(true)
			const response = await applicationsAPI.getApplication(+id)
			if (response.status === 200) {
				setApplication(response.data)
			}
			setLoading(false)
		})()
	}, [id]);



	return (
		<Block style={{ padding: 20 }} fullHeight={true}>
			{/* <Application application={application} /> */}
		</Block>

	)
}

export default ProjectContainer;
