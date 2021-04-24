import React, { useState, useEffect } from 'react'
import cn from 'classnames'

import { Field, useField, FieldAttributes } from "formik";
import { makeStyles, FilledInput } from '@material-ui/core'
import { DefaultInput } from '../CustomComponents/CustomInputs';



export const useFieldStyles = makeStyles(theme => ({
	form__field: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginBottom: '4px',
		position: 'relative',

		"& label": {
			marginRight: '20px',
			fontSize: '18px',
			lineHeight: '22px',
		},

		"& .MuiFormControl-root": {
			width: '100%'
		},
		"&.field_with_icon input": {
			paddingRight: '40px'
		},
		"&.big_input .icon_password": {
			top: '8px',
		}

	},
	dropdown: {
		"& .MuiInputBase-root": {
			padding: 0,
			"& .MuiSelect-root": {
				paddingLeft: '12px'
			}

		}
	},
	field_icon: {
		position: 'absolute',
		"&.icon_password": {
			right: '8px',
			top: '22px',
			height: '32px'
		},
		"&.icon_delete": {
			right: '10px',
			top: '28px',
		}
	}
}))


type CustomFieldProps = {
	name: string
	label?: string
	canSeeInputValue?: boolean
	deleteFunc?: () => void
	type?: string
	placeholder?: string
	optional?: boolean
	disabled?: boolean
	Component?: any

	checkboxChecked?: boolean

	onValueChange?: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}

export const CustomField: React.FC<FieldAttributes<CustomFieldProps>> = (
	{ label, canSeeInputValue, placeholder = "", deleteFunc, optional = false, disabled = false, Component = FilledInput, onValueChange, ...props }) => {
	const classes = useFieldStyles()
	const [field, meta] = useField<CustomFieldProps>(props);

	let errorText = meta.error && meta.touched ? meta.error : "";
	if (errorText.includes(field.name)) {
		errorText = errorText.slice(field.name.length)
		if (!!label)
			errorText = label + errorText
		else
			errorText = placeholder + errorText
	}


	let type = props.type;
	const [passwordVisibilty, setPasswordVisibilty] = useState(false)

	if (canSeeInputValue) {
		if (passwordVisibilty) {
			type = "text"
		} else {
			type = "password"
		}
	}
	const togglePasswordVisibilty = () => {
		setPasswordVisibilty(!passwordVisibilty)
	}

	let showPasswordButton
	if (canSeeInputValue) {
		showPasswordButton =
			<button
				type="button"
				onClick={togglePasswordVisibilty}
				className={cn(classes.field_icon, "icon_password")}
			>
			</button>
	}

	let fieldClass = classes.form__field
	if (deleteFunc || canSeeInputValue) {
		fieldClass = cn(classes.form__field, "field_with_icon")
	}

	let helperText
	if (optional && errorText === "") {
		helperText = 'Optional'
	} else {
		helperText = errorText
	}
	let multiline = false
	if (type === 'textarea') {
		multiline = true
	}

	let leftLabel = ''
	if (Component === DefaultInput && label) {
		leftLabel = label
		label = ''
	}

	return (
		<div className={fieldClass}>
			{leftLabel ? <label>{leftLabel}</label> : null}
			<Component
				label={label}
				{...field}
				type={type}
				placeholder={placeholder}
				multiline={type === 'textarea'}
				// helperText={helperText}
				error={!!errorText}
				disabled={disabled}
				onValueChange={onValueChange}
				field={field}

			/>

			{showPasswordButton}

		</div>
	)
}