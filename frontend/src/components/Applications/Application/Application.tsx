

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
import EditApplicationModal from '../../Common/Modals/EditApplicationModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import EstimationForm from 'components/Applications/Application/EstimationForm.tsx'


type PropsType = {
	application: ApplicationType
	approve: () => void
	refuse: () => void
	setNeedRefresh?: (need: boolean) => void
}

const Application = ({ application, approve, refuse, setNeedRefresh, ...props }: PropsType) => {
	const [modalOpen, setModalOpen] = useState(false)


	const setEstimation = async (val: number) => {
		const response = await applicationsAPI.setEstimation(application.id, val)
		if (response.status >= 200 && response.status < 300) {
			if (setNeedRefresh) {
				setNeedRefresh(true)
			}
		}
	}



	if (!application.id) {
		return null
	}

	const serviceRating = application.service_estimation
	const resourseRating = application.resource_estimation


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
					<p className={s.projectName}>Parking place: {application.parking_place.code}</p>
					<p className={s.projectName}>Start date: {moment(application.start_time).format('YYYY.MM.DD HH:mm')}</p>
					<p className={s.projectName}>End date: {moment(application.end_time).format('YYYY.MM.DD HH:mm')}</p>
				</div>


				{serviceRating && <div>
					<p className={s.projectName}>Service Quality:</p>
					<div className={s.stars}>
						{Array.from({ length: +serviceRating.toFixed() }).map((star, counter) => <FontAwesomeIcon icon={faStar} key={counter} />)}
						{Array.from({ length: 5 - +serviceRating.toFixed() }).map((star, counter) => <FontAwesomeIcon icon={faStarEmpty} key={counter} />)}
						{serviceRating ? <h4 className={s.projectName}>{serviceRating.toFixed(1)}</h4> : null}
					</div>
				</div>}

				{resourseRating && <div>
					<p className={s.projectName}>Resource Quality:</p>
					<div className={s.stars}>
						{Array.from({ length: +resourseRating.toFixed() }).map((star, counter) => <FontAwesomeIcon icon={faStar} key={counter} />)}
						{Array.from({ length: 5 - +resourseRating.toFixed() }).map((star, counter) => <FontAwesomeIcon icon={faStarEmpty} key={counter} />)}
						{resourseRating ? <h4 className={s.projectName}>{resourseRating.toFixed(1)}</h4> : null}
					</div>
				</div>}


			</div>




			{ canApproveOrRefuse(application.status) &&
				<ButtonsHolder>
					<SubmitRoundedButton onClick={() => setModalOpen(true)}>Edit</SubmitRoundedButton>
					<SubmitRoundedButton onClick={approve}>Approve</SubmitRoundedButton>
					<DismissSimpleButton onClick={refuse}>Refuse</DismissSimpleButton>
				</ButtonsHolder>}


			{modalOpen && <EditApplicationModal
				application={application}
				open={modalOpen}
				handleClose={() => setModalOpen(false)}
				submitFunction={() => {
					if (setNeedRefresh) setNeedRefresh(true)
				}}
			/>}
		</div>
	)
}


type ButtonPropsType = {
	value: number
	rating: number
	setRating: (val: number) => void
	hoverRating: number
	setHoverRating: (val: number) => void

}

const RatingButton = ({ value, rating, setRating, hoverRating, setHoverRating }: ButtonPropsType) => {
	let icon = faStarEmpty
	let iconClassName = s.empty

	if (value <= rating || value <= hoverRating) {
		icon = faStar
		iconClassName = s.filled
	}
	return (
		<button
			onClick={() => { setRating(value) }}
			onMouseEnter={() => setHoverRating(value)}
			onMouseLeave={() => setHoverRating(0)}
			className={classnames(s.ratingButton, iconClassName)}
		>
			<FontAwesomeIcon
				icon={icon}
			/>
		</button>
	)
}





export default Application;
