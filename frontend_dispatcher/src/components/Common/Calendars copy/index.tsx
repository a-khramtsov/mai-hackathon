
import React, { useState, useEffect, FC } from 'react'
import s from './style.module.scss'
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from 'moment';
import "moment/locale/ru";
import MomentUtils from "@date-io/moment";

export type CalendarsBlockPropsType = {
	startDate: string
	setStartDate: (date: string) => void
	endDate: string
	setEndDate: (date: string) => void
}

moment.locale("ru");


const CalendarsBlocks: FC<CalendarsBlockPropsType> = ({ startDate, endDate, setStartDate, setEndDate }) => {
	return (
		<MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"ru"}>
			<div className={s.calendarsBlock}>

				<KeyboardDateTimePicker
					variant="inline"
					format="yyyy/MM/DD HH:mm"
					value={startDate}
					onChange={setStartDate as any}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
					maxDate={endDate}
				/>

				<KeyboardDateTimePicker
					disableToolbar
					variant="inline"
					format="yyyy/MM/DD HH:mm"
					value={endDate}
					onChange={setEndDate as any}
					KeyboardButtonProps={{
						'aria-label': 'change date',
					}}
					maxDate={moment()}
				/>
			</div>

		</MuiPickersUtilsProvider>
	)
}

export default CalendarsBlocks