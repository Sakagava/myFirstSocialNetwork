import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/rtkHooks'
import { fetchUsers } from '../store/users'

export const useFetchUsers = () => {
	const dispatch = useAppDispatch()
	const users = useAppSelector(state => state.users.users)

	useEffect(() => {
		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch, users.length])
}
