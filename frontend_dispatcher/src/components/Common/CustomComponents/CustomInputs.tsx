import React, { FC } from 'react'
import { withStyles, InputAdornment, FormControl, makeStyles, Hidden, OutlinedInput } from '@material-ui/core'
import { TextField } from '@material-ui/core'

import searchIcon from '../../../assets/img/search-icon.png'




export const AuthInput = withStyles((theme) => ({
	root: {
		"& label.MuiFormLabel-root.MuiInputLabel-shrink": {
			fontSize: '18px',
			lineHeight: '100%',
			fontWeight: 'bold',
			fontFamily: 'Proxima Nova Th',
			color: theme.palette.primary.dark,
		},
		"& .MuiInputBase-root": {
			fontSize: '18px',
		}

	},
}))(TextField);


export const DefaultInput = withStyles((theme) => ({
	root: {
		"& .MuiInputBase-root": {
			fontSize: '16px',
			lineHeight: '24px',
			color: "#A6ACBE",
			fontFamily: "HelveticaNeueCyr",
			padding: "8px 16px",
			boxSizing: 'border-box',
			borderRadius: '10px',
			"& textarea": {
				height: "130px!important"
			},
			"& input": {
				padding: 0
			}
		}

	},
}))((props) => <TextField variant="outlined" {...props}></TextField>);




// ** SEARCH INPUT START **
type SearchInputTypes = {
	value: string
	onChange: (searchText: string) => void
	handleSearch: () => void
	placehodler: string
}

export const SearchInput: FC<SearchInputTypes> = ({ value, onChange, handleSearch, placehodler, ...props }) => {
	const classes = makeStyles(theme => ({
		root: {
			width: '100%',
			fontSize: "13px",
			lineHeight: "24px",
			color: "rgba(0, 0, 0, 0.54)",
			letterSpacing: "0.15px",
			background: "#E8E8E8",
			borderRadius: '10px',
			overflow: 'hidden',
			"& .MuiInputBase-root": {
				background: "#E8E8E8",
				"&:before, &:after": {
					borderBottom: 'none!important'
				},
				"& input": {
					padding: '11px 12px 9px'
				}
			},
			"& .input__icon": {
				filter: 'invert(16%) sepia(4%) saturate(602%) hue-rotate(236deg) brightness(93%) contrast(89%)'
			},
			"& .MuiInputAdornment-positionStart": {
				marginTop: '4px!important',
			}
		}
	}))()

	return (
		<TextField
			className={classes.root}
			placeholder={placehodler}
			variant="filled"
			value={value}
			onChange={(e) => { onChange(e.target.value) }}
			onKeyUp={(e) => { if (e.keyCode === 13) handleSearch() }}
			InputProps={{
				startAdornment: <InputAdornment position="start"><img src={searchIcon} alt="search-icon" className="input__icon" /></InputAdornment>,
			}}

		/>
	);
};
// ** SEARCH INPUT END**
