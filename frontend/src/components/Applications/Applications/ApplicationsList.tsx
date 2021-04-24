

import React, { FC } from 'react'
import s from './style.module.scss'
import { Link } from "react-router-dom"
import projectImg from '../../../assets/img/project-img.png'
import { ApplicationType } from 'types/applications'
import locationIcon from '../../../assets/img/location-icon.png'

type PropsTypes = {
	applications: Array<ApplicationType>
}

const ApplicationsList: FC<PropsTypes> = ({ applications, ...props }) => {
	return (
		<div className={s.projectsList}>
			{applications.map(application =>
				<Link to={`/applications/${application.id}`} key={application.id} className={s.projectsListElement}>
					<div className={s.projectInfo}>
						<div className={s.projectName}>Название заявки</div>
						<div className={s.projectLocation}>
							<img src={locationIcon} alt="location-icon" />
							<p>Санкт-Петербург</p>
						</div>

						{/* <div className={s.serviceInfo}>
							<div className={s.price}>от 100р<span> / час</span></div>
							<div className={s.date}>6 апреля, 11:35</div>
						</div> */}
					</div>

				</Link>
			)}
		</div>

	)
}

export default ApplicationsList;
