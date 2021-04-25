

import React, { useEffect, useState } from 'react'
import './App.scss'
import { Route } from "react-router-dom"
import { Switch, useHistory } from 'react-router'
import { withSuspense } from './hoc/withSuspense'
import Header from './components/Header/Header'
import useResolution from './hooks/useResolution'
import { useAppSelector } from 'types/redux/redux'
import Login from 'components/Auth'
import useAuth from 'hooks/useAuth'
import Projects from './components/Applications/Applications'
import Project from './components/Applications/Application/ApplicationContainer'


const App = () => {
	const is768 = useResolution(768)
	const history = useHistory()
	useAuth()
	const logged = useAppSelector(state => state.me.logged)
	const me = useAppSelector(state => state.me.userInfo)

	useEffect(() => {
		console.log(history.location.pathname)
		console.log(logged)
		if (logged && (history.location.pathname === '/' || history.location.pathname === '')) {
			history.push("/applications")
		}
	}, [history, logged])

	const [needRefresh1, setNeedRefresh1] = useState(false)
	const [needRefresh2, setNeedRefresh2] = useState(false)
	useEffect(() => {
		if (me.id) {
			const WSclient = new WebSocket(`ws://api.svo.lapotnikov.ru/ws/airline/${me.airline.id}/`);

			WSclient.onopen = () => {
				console.log('open')
			};
			WSclient.onmessage = (message) => {
				setNeedRefresh1(true)
				setNeedRefresh2(true)
			}
		}
	}, [me])

	if (!logged) {
		return <Login />
	}



	return (
		<div className="app-container">
			<Header />
			<div className="app-content">
				<Switch>

					<Route exact={is768} path="/applications" component={() => <Projects needRefresh={needRefresh1} setNeedRefresh={setNeedRefresh1} />} />
					{is768 && <Route exact path="/applications/:id" component={() => <Project needRefresh={needRefresh2} setNeedRefresh={setNeedRefresh2} />} />}


					<Route component={() => <div>Страница не найдена</div>} />

				</Switch>
			</div>
		</div>
	)
}

export default App;
