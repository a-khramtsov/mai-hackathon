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

type PropsType = {
	open: boolean
	handleClose: () => void
	submitFunction: (message: string) => void
}


const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiDialog-paper": {
			borderRadius: '10px',
			maxWidth: '400px',
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


const SubmissionModal = ({ open, handleClose, submitFunction, ...props }: PropsType) => {
	const classes = useStyles()
	const handleSubmit = async (data: any, setSubmitting: any) => {
		setSubmitting(true);
		await submitFunction(data.message)
		setSubmitting(false);
		handleClose()
	}

	const validationSchema = yup.object({
		message: yup.string().min(2).required(),
		surname: yup.string().required(),
		name: yup.string().required(),
		email: yup.string().required(),
		phone: yup.string().required(),
		role: yup.string().required(),
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
							<div className={classes.changePhoto}>
								<img src={userImg} alt="user-img" />
								<DismissSimpleButton onClick={() => {  }} style={{ color: "#FFB800", fontSize: '16px' }}>Сменить фото профиля</DismissSimpleButton>
							</div>

							<div style={{ margin: '30px 0' }}>
								<CustomField name={'surname'} placeholder="Иванов" Component={DefaultInput} label="Фамилия" />
								<CustomField name={'name'} placeholder="Иван" Component={DefaultInput} label="Имя" />
								<CustomField name={'email'} placeholder="example@example.com" Component={DefaultInput} label="Email" />
								<CustomField name={'phone'} placeholder="+7 999 999 99 99" Component={DefaultInput} label="Телефон" />
								<CustomField name={'role'} placeholder="" Component={DefaultInput} label="Роль" />
							</div>

							<ButtonsHolder >
								<DismissSimpleButton onClick={() => { }} style={{ fontSize: '16px' }}>Удалить сотрудника</DismissSimpleButton>
								<SubmitRoundedButton>Сохранить</SubmitRoundedButton>
							</ButtonsHolder>
						</Form>
					)}
				</Formik>
			</Dialog>
		</React.Fragment>
	);
}
export default SubmissionModal