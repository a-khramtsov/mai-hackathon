

import React, { FC, useEffect, useState } from 'react'
import s from './style.module.scss'
import { SearchInput } from '../../../../Common/CustomComponents/CustomInputs'

type PropsTypes = {
	searchText: string
	setSearchText: (search: string) => void
}

const Search: FC<PropsTypes> = ({ searchText, setSearchText, ...props }) => {
	return (
		<div className={s.searchBlock}>
			<SearchInput value={searchText} onChange={setSearchText} handleSearch={() => { }} placehodler={"Найти объявление"} />
		</div>
	)
}

export default Search;
