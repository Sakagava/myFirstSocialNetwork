import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortUsers } from '../store/users'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
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

function PageAllAccounts() {
	const users = useSelector(state => state.users.users)
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState(useSelector(state => state.users.sortBy))

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
					<UserCard
						variant='outlined'
						key={user.id}
						onClick={() => {
							dispatch(setPage('Account'))
							dispatch(setCurrentUser(user.id))
						}}
					>
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
				)
			})}
		</Container>
	)
}

export default PageAllAccounts
