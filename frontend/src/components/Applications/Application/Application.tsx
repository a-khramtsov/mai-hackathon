

import React, { useState } from 'react'
import s from './Application.module.scss'
import classNames from 'classnames'
import projectImg from '../../../assets/img/project-img.png'
import userImg from '../../../assets/img/user-img.png'
import { SubmitRoundedButton, DismissSimpleButton, DismissRoundedButton } from '../../Common/CustomComponents/CustomButtons'
import { ButtonsHolder } from '../../Common/CustomComponents/Blocks'
import SubmissionModal from '../../Common/Modals/SubmissionModal'
import { ApplicationType } from 'types/applications'
import moment from 'moment'
import { applicationsAPI } from 'api'
import { canApproveOrRefuse } from 'components/Applications/Applications/ApplicationsList'
import locationIcon from '../../../assets/img/location-icon.png'

type PropsType = {
	application: ApplicationType
	approve: () => void
	refuse: () => void
}

const Application = ({ application, approve, refuse, ...props }: PropsType) => {
	const [modalOpen, setModalOpen] = useState(false)



	if (!application.id) {
		return null
	}

	return (
		<div className={s.projectBlock}>
			<div className={s.previewBlock}>

				<img src={application.resource.photo} alt="project-img" className={s.projectImg} />


				<div className={s.previewInfo}>
					<div className={s.placeInfo}>
						<img src={application?.user?.avatar} alt="user-img" />
						<div className={s.placeDetails}>
							<p className={s.placeName}>{(application?.user?.last_name || '') + ' ' + (application?.user?.first_name || '')}</p>
							<p className={s.placeCategory}>{application?.user?.airline.name}</p>
						</div>
					</div>


					<p className={s.projectName} style={{ fontSize: 16 }}>{application.resource.title}</p>
					<p className={s.projectName}>Start date: {moment(application.start_time).format('YYYY.MM.DD HH:mm')}</p>
					<p className={s.projectName}>Parking place: {application.parking_place.code}</p>
					<p className={s.projectName}>End date: {moment(application.end_time).format('YYYY.MM.DD HH:mm')}</p>
				</div>
			</div>



			{ canApproveOrRefuse(application.status) &&
				<ButtonsHolder>
					<SubmitRoundedButton onClick={approve}>Approve</SubmitRoundedButton>
					<DismissSimpleButton onClick={refuse}>Refuse</DismissSimpleButton>
				</ButtonsHolder>}



		</div>
	)
}

export default Application;
