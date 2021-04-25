

import React, { FC } from 'react'
import s from './style.module.scss'
import { Link } from "react-router-dom"
import projectImg from '../../../assets/img/project-img.png'
import { ApplicationFiltersEnum, ApplicationType } from 'types/applications'
import locationIcon from '../../../assets/img/location-icon.png'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

type PropsTypes = {
	applications: Array<ApplicationType>
	approve: (id: number) => void
	refuse: (id: number) => void
}

const ApplicationsList: FC<PropsTypes> = ({ applications, approve, refuse, ...props }) => {

	const getRatingTheme = (rating: number) => {
		let theme = null
		if (rating >= 4) {
			theme = s.green
		} else if (rating < 4 && rating >= 2.5) {
			theme = s.yellow
		} else {
			theme = s.red
		}
		return theme
	}

	return (
		<div className={s.projectsList}>

			{ (applications.length === 0) && <p className={s.emptyList}>No applications</p>}
			{applications.map(application =>
				<Link to={`/applications/${application.id}`} key={application.id} className={s.projectsListElement + ' ' + getRatingTheme(application.user.estimation)}>


					<div className={s.flex} style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
						<img className={s.previewImg} src={application.resource.photo} />
						<div className={s.projectInfo} style={{ width: '100%' }}>

							<div className={s.flex} style={{ marginBottom: 10, width: '100%' }}>
								<div className={s.projectName}>{application.resource.title}</div>
								{canApproveOrRefuse(application.status) &&
									<div className={s.flex}>
										<button className={s.button} onClick={(e: any) => { approve(application.id); e.preventDefault() }}>
											<FontAwesomeIcon icon={faCheck} />
										</button>
										<button className={s.button} onClick={(e: any) => { refuse(application.id); e.stopPropagation() }}>
											<FontAwesomeIcon icon={faTimes} />
										</button>
									</div>}
							</div>
							<div className={s.projectLocation}>
								<img src={locationIcon} alt="location-icon" />
								<p>Parking place: {application.parking_place.code}</p>
							</div>
							<p className={s.date}>Status:&nbsp;<span className={getStatusColor(application.status)}>{ApplicationFiltersEnum[application.status]}</span>
							</p>
							<p className={s.date}>Start date: {moment(application.start_time).format('DD.MM.DD HH:mm')}</p>
							<p className={s.date}>End date: {moment(application.end_time).format('DD.MM.DD HH:mm')}</p>


						</div>
					</div>
				</Link>
			)
			}
		</div >
	)
}

export const canApproveOrRefuse = (status: ApplicationFiltersEnum) => {
	if (status === ApplicationFiltersEnum.APPROVED_BY_AIRLINE)
		return true
	return false
}


const getStatusColor = (status: ApplicationFiltersEnum) => {
	let theme = ''
	switch (status) {
		case ApplicationFiltersEnum.APPROVED_BY_AIRLINE:
		case ApplicationFiltersEnum.REFUSED_BY_DISPATCHER:
		case ApplicationFiltersEnum.CANCELLED: {
			theme = s.c_red
			break
		}

		case ApplicationFiltersEnum.APPROVED_BY_AIRLINE:
		case ApplicationFiltersEnum.APPROVED_BY_DISPATCHER: {
			theme = s.c_green
			break
		}

	}
	return theme
}

export default ApplicationsList;
