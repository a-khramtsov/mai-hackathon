import React, { useState } from 'react';
import s from './Modal.module.scss'
import { Dialog, DialogContent, DialogTitle, makeStyles, createStyles } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import * as yup from "yup";
import classes from '*.module.css';
import { CustomField } from '../FormComponents/FormComponents';
import { DefaultInput } from '../CustomComponents/CustomInputs';
import { ButtonsHolder } from '../CustomComponents/Blocks';
import { DismissSimpleButton, SubmitRoundedButton } from '../CustomComponents/CustomButtons';
import userImg from '../../../assets/img/user-img.png'
import { applicationsAPI } from 'api';
import { ApplicationType } from 'types/applications';
import CalendarsBlocks from 'components/Common/Calendars';
import moment from 'moment';

type PropsType = {
	application: ApplicationType
	open: boolean
	handleClose: () => void
	submitFunction: () => void
}


const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiDialog-paper": {
			borderRadius: '10px',
			maxWidth: '600px',
			boxSizing: 'border-box',
			padding: '20px',

			"& .MuiFormControl-root": {
				width: '250px'
			}
		},
	},
	changePhoto: {
		display: 'flex',
		alignItems: 'center',
		"& img": {
			width: '100px',
			height: '100px',
			borderRadius: '100%',
			marginRight: '20px'
		}
	}
}));


const SubmissionModal = ({ open, handleClose, application, submitFunction, ...props }: PropsType) => {
	const classes = useStyles()

	const [start, setStart] = useState(moment(application.start_time).format())
	const [end, setEnd] = useState(moment(application.end_time).format())

	const handleSubmit = async () => {

		const response = await applicationsAPI.editApplication({ id: application.id, start_time: moment(start).toISOString(), end_time: moment(end).toISOString() } as ApplicationType)
		if (response.status >= 200 && response.status < 300) {
			submitFunction()
		}


		handleClose()
	}





	return (
		<React.Fragment>
			<Dialog
				fullWidth={true}
				maxWidth={'xl'}
				open={open}
				onClose={handleClose}
				className={classes.root}
			>
				<CalendarsBlocks
					startDate={start}
					endDate={end}
					setStartDate={setStart}
					setEndDate={setEnd}
				/>

				<SubmitRoundedButton onClick={handleSubmit}>Submit</SubmitRoundedButton>

			</Dialog>
		</React.Fragment>
	);
}
export default SubmissionModal