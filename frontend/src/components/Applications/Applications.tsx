

import React, { FC } from 'react'
import s from './Applications.module.scss'
import ApplicationsListContainer from './Applications/ApplicationsListContainer'
import ApplicationContainer from './Application/ApplicationContainer'
import { Route, Switch } from 'react-router-dom'
import { Block } from '../Common/CustomComponents/Blocks'


const Applications = ({ ...props }) => {
	return (
		<div className={s.desktop}>
			<ApplicationsListContainer />
			<Switch>
				<Route exact path='/applications' component={() => <Block fullHeight={true} style={{ padding: 20 }}> <p>Выберите заявку</p></Block>} />
				<Route exact path='/applications/:id' component={ApplicationContainer} />
			</Switch>
		</div>
	)
}

export default Applications;
