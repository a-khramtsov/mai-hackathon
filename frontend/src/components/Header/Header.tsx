

import React, { useState, useEffect } from 'react'
import s from './Header.module.scss'

import userImg from '../../assets/img/user-img.png'
import { HeaderMenu } from './HeaderMenu';


const Header = (props: any) => {
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
				<button className={s.userImg} onClick={handleClick}><img src={userImg} alt="user-img"/></button>
			</div>

			<HeaderMenu handleClose={handleMenuClose} anchorEl={anchorEl} />
		</div>

	)
}

export default Header;
