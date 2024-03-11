import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, sortUsers } from '../store/users'
import {
	CardHeader,
	Avatar,
	Container,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'
import { InputWrap, UserCard } from '../styles/AllAccounts'
import { Link } from 'react-router-dom'

function PageAllAccounts() {
	const users = useSelector(state => state.users.users)
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState(useSelector(state => state.users.sortBy))

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useEffect(() => {
		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch])

	const handleChange = e => {
		setSortBy(e.target.value)
		dispatch(sortUsers(e.target.value.toLowerCase()))
	}

	return (
		<Container sx={{ paddingTop: '20px' }}>
			<InputWrap>
				<FormControl sx={{ width: '240px' }}>
					<InputLabel id='demo-simple-select-label'>Sort by:</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={sortBy}
						label='sortBy'
						onChange={handleChange}
					>
						<MenuItem value={'name'}>Name</MenuItem>
						<MenuItem value={'username'}>Username</MenuItem>
					</Select>
				</FormControl>
			</InputWrap>
			{users.map(user => {
				return (
					<Link
						key={user.id}
						to={`/users/user/${user.id}`}
						style={{ padding: '0', textDecoration: 'none', color: 'inherit' }}
					>
						<UserCard variant='outlined' key={user.id}>
							<CardHeader
								avatar={
									<Avatar
										aria-label='recipe'
										alt={`User ${user.name}`}
										src={`/src/assets/img/usersPhoto/photo${user.id}.jpeg`}
										sx={{ width: 100, height: 100 }}
									></Avatar>
								}
								title={user?.username}
								subheader={user?.name}
							/>
						</UserCard>
					</Link>
				)
			})}
		</Container>
	)
}

export default PageAllAccounts
