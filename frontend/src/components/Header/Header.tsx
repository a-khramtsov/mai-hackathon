

import React, { useState, useEffect } from 'react'
import s from './Header.module.scss'

import userImg from '../../assets/img/user-img.png'
import { HeaderMenu } from './HeaderMenu';
import { useAppSelector } from 'types/redux/redux';


const Header = (props: any) => {
	const me = useAppSelector(state => state.me.userInfo)
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={s.headerHolder}>
			<div className={s.header}>
				<button className={s.userImg} onClick={handleClick}><img src={me.avatar} alt="user-img" /></button>
			</div>

			<HeaderMenu handleClose={handleMenuClose} anchorEl={anchorEl} />
		</div>

	)
}

export default Header;
