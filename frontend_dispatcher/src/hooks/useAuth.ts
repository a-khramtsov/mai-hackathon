import { useEffect } from 'react'
import { authUser } from 'redux/me/meSlice'
import { useAppDispatch } from 'redux/store'

const useAuth = () => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(authUser())
	}, [dispatch])
}

export default useAuth
