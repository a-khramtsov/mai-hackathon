import React, { useState } from 'react';
import s from './Modal.module.scss'
import { Dialog, DialogContent, DialogTitle, makeStyles, createStyles } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';

import * as yup from "yup";
import classes from '*.module.css';
import { CustomField } from '../FormComponents/FormComponents';
import { DefaultInput } from '../CustomComponents/CustomInputs';

type PropsType = {
	open: boolean
	handleClose: () => void
	submitFunction: (message: string) => void
	titleText: string
	buttons: any
}


const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiDialog-paper": {
			borderRadius: '14px',
			maxWidth: '600px'
		},
	},
	modalTitle: {
		fontWeight: 'bold',
		fontSize: '16px',
		lineHeight: '24px',
		marginBottom: '10px'
	},
	dialog__content: {
		background: "#F1F0F0",
		border: "1px solid #F1F0F0",
		boxSizing: "border-box",
		padding: "15px 15px 30px 15px"
	},
	dialog__buttons: {
		padding: "15px",
		boxSizing: "border-box",
		background: "#fff"
	}

}));


const SubmissionModal = ({ open, handleClose, titleText, submitFunction, buttons, ...props }: PropsType) => {
	const classes = useStyles()
	const handleSubmit = async (data: any, setSubmitting: any) => {
		setSubmitting(true);
		await submitFunction(data.message)
		setSubmitting(false);
		handleClose()
	}

	const validationSchema = yup.object({
		message: yup.string().min(2).required(),
	});






	return (
		<React.Fragment>
			<Dialog
				fullWidth={true}
				maxWidth={'xs'}
				open={open}
				onClose={handleClose}
				className={classes.root}
			>
				<Formik
					validateOnChange={true}
					initialValues={{ message: '' }}
					validationSchema={validationSchema}
					validate={values => {
						const errors: Record<string, string> = {};
						return errors;
					}}
					onSubmit={(data, { setSubmitting }) => {
						handleSubmit(data, setSubmitting)
					}}
				>

					{({ values }) => (
						<Form>

							<div className={classes.dialog__content}>
								<div className={classes.modalTitle}>{titleText}</div>
								<CustomField name={'message'} placeholder="Введите текст" Component={DefaultInput} type="textarea"/>
							</div>
							<div className={classes.dialog__buttons}>
								{buttons}
							</div>
						</Form>
					)}
				</Formik>
			</Dialog>
		</React.Fragment>
	);
}
export default SubmissionModal