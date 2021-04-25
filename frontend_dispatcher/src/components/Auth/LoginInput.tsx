import React from 'react'
import { createUseStyles } from 'react-jss'

type PropsType = {}

export const LoginInput = (props: PropsType & React.InputHTMLAttributes<HTMLInputElement>) => {
	const styles = useStyles()

	return <input {...props} className={styles.root} />
}

const useStyles = createUseStyles({
	root: {
		width: '100%',
		border: 'none',
		borderBottom: '1px solid rgba(0, 0, 0, 0.38)',
		padding: '5px 0',
		fontSize: '16px',
		lineHeight: '24px',
		marginTop: 20,
	},
})
