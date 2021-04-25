import React, { FC, useState } from 'react'
import { Button, withStyles } from '@material-ui/core'
 

const FilledButton = withStyles((theme) => ({
	root: {
		fontSize: '13px',
		lineHeight: '16px',
		boxSizing: 'border-box',
		padding: '7px 20px',
		fontWeight: 'bold',
		borderRadius: '3px',
		background: '#F3F3F3',
		color: theme.palette.text.primary,
		textTransform: 'none',
		transition: '.3s',
		"&:hover": {
			opacity: '.7',
			color: theme.palette.text.primary
		},
		
	}
}))(Button);

const RoundedButton = withStyles((theme) => ({
	root: { borderRadius: '10px', }
}))(FilledButton);


export const SubmitFilledButton = withStyles((theme) => ({
	root: {
		background: theme.palette.info.main,
		color: '#fff',
		padding: '10px 16px',
		// fontWeight: 'bold',
		boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',

		"&:hover": {
			background: theme.palette.info.main,
		},
		"&:disabled": {
			background: '#F3F3F3',
		} 
	}
}))(FilledButton);

export const SubmitRoundedButton = withStyles((theme) => ({
	root: { background: theme.palette.info.main, color: '#fff' }
}))(RoundedButton);


export const DismissSimpleButton = withStyles((theme) => ({
	root: { color: theme.palette.error.main, background: 'transparent' }
}))(FilledButton);
export const DismissRoundedButton = withStyles((theme) => ({
	root: { background: theme.palette.error.main, color: '#fff' }
}))(RoundedButton);


// export const StyledDefaultButton = withStyles((theme) => ({
// 	root: {
// 		color: colors.primary_text_color,
// 		background: colors.bg_white_color,
// 		border: `1px solid ${colors.dark_line_color}`,
// 		"&:hover": {
// 			border: `1px solid ${colors.placholder_text_color}`,
// 			background: colors.bg_white_color,
// 			color: colors.primary_text_color
// 		},
// 		"&:active": {
// 			background: colors.bg_page_color,
// 			border: `1px solid ${colors.dark_line_color}`,
// 			color: colors.placholder_text_color
// 		},
// 		"&:disabled": {
// 			border: `1px solid ${colors.dark_line_color}`,
// 			color: colors.dark_line_color,
// 		}
// 	}
// }))(CustomButton);