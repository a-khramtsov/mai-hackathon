

import React, { FC, useEffect, useState } from 'react'
import s from './style.module.scss'
import { FilterForRequestEnum } from 'types/applications'
import classNames from 'classnames'


type PropsTypes = {
	filter: FilterForRequestEnum
	setFilter: (filter: FilterForRequestEnum) => void
}

const filters = [
	{ label: 'Under consideration', value: FilterForRequestEnum.NEW },
	{ label: 'History', value: FilterForRequestEnum.HISTORY },
	{ label: 'Approved', value: FilterForRequestEnum.APPROVED },
	{ label: 'Rejected ', value: FilterForRequestEnum.REFUSED },
]

const Filters: FC<PropsTypes> = ({ filter: currentFilter, setFilter, ...props }) => {
	return (
		<div className={s.projectsFiltersBlock}>
			{filters.map(filter => <Filter
				key={filter.value}
				filter={currentFilter}
				setFilter={setFilter}
				label={filter.label}
				value={filter.value}
			/>)}
		</div>

	)
}


type FilterProps = {
	filter: FilterForRequestEnum
	setFilter: (filter: FilterForRequestEnum) => void
	label: string
	value: FilterForRequestEnum
}
const Filter = ({ filter, setFilter, label, value }: FilterProps) => (
	<button
		className={classNames(s.filter, { [s.active]: filter === value })}
		onClick={() => { setFilter(value) }}
	>
		{label}
	</button>
)

export default Filters;
