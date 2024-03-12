import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../store/users'

export const useFetchUsers = () => {
	const dispatch = useDispatch()
	const users = useSelector(state => state.users.users)

	useEffect(() => {
		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch, users.length])
}
