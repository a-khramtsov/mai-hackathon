

import React, { useState } from 'react'
import s from '../Application.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons'
import classnames from 'classnames'
import { ApplicationType } from 'types/applications';
import { SubmitRoundedButton } from 'components/Common/CustomComponents/CustomButtons';


type PropsType = {
	setEstimation: (estimation: number) => void
	application: ApplicationType
}

const EstimationForm = ({ setEstimation, ...props }: PropsType) => {


	const [rating, setRating] = useState(5)
	const [hoverRating, setHoverRating] = useState(0)

	return (
		<>
			<div className={s.stars}>
				{Array.from({ length: 5 }).map((el, counter) =>
					<RatingButton
						rating={rating}
						setRating={setRating}

						hoverRating={hoverRating}
						setHoverRating={setHoverRating}
						value={counter + 1}
					/>)}
				<p className={s.projectName}>({rating})</p>
			</div>
			<SubmitRoundedButton style={{ marginTop: 10 }} onClick={() => setEstimation(rating)}>Set estimation</SubmitRoundedButton>
		</>
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





export default EstimationForm;
