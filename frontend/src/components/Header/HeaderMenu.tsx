import React from 'react';
import { Menu, MenuItem, makeStyles } from '@material-ui/core';
import s from './Header.module.scss'
import { logout } from 'redux/me/meSlice'
import userImg from '../../assets/img/user-img.png'
import logoutIcon from '../../assets/img/logout-icon.png'
import { useAppDispatch } from 'redux/store';
import { useAppSelector } from 'types/redux/redux';


type HeaderMenuProps = {
	anchorEl: null | HTMLElement
	handleClose: () => void
}
const useStyles = makeStyles(theme => ({
	root: {
		"& .MuiPaper-root": {
			top: "0!important",
			right: "0!important",
			"& ul": {
				padding: "0!important",
			}
		}
	},
	menu__item: {
		color: '#696969',
		fontWeight: 'bold',
		fontSize: '14px',
		lineHeight: '17px',
		paddingTop: '10px',
		paddingBottom: '10px',
		"& img": {
			marginRight: "25px"
		}
	},
}));



export const HeaderMenu: React.FC<HeaderMenuProps> = ({ anchorEl, handleClose, ...props }) => {
	const classes = useStyles()
	const dispatch = useAppDispatch()
	const me = useAppSelector(state => state.me.userInfo)

	return (
		<div style={{ boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.2)', borderRadius: '4px' }}>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				className={classes.root}
			>
				<div className={s.userBlock}>
					<img src={me.avatar} alt="user-img" />
					<div className={s.userInfo}>
						<p className={s.userName}>{(me.last_name || '') + ' ' + (me.first_name || '')}</p>
						<p className={s.userRole}>Airline: {me.airline.name}</p>
					</div>
				</div>

				<MenuItem
					className={classes.menu__item}
					onClick={() => {
						dispatch(logout())
						handleClose()
					}}>
					<img src={logoutIcon} alt="settings-icon" />
					Logiut
				</MenuItem>
			</Menu>
		</div>
	);
}