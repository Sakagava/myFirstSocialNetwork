import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortUsers } from '../store/users'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
import {
	Card,
	CardHeader,
	Avatar,
	Container,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Paper,
} from '@mui/material'
import styled from '@emotion/styled'

function PageAllAccounts() {
	const users = useSelector(state => state.users.users)
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = useState(useSelector(state => state.users.sortBy))

	const handleChange = e => {
		setSortBy(e.target.value)
		dispatch(sortUsers(e.target.value.toLowerCase()))
	}

	const InputWrap = styled(Box)(() => ({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		marginBottom: '20px',
	}))

	const UserCard = styled(Paper)(() => ({
		height: { xs: 135, sm: 135, md: 135, lg: 135, xl: 135 },
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		marginBottom: '10px',
		cursor: 'pointer',
		transition: '0.2s',
		':hover': {
			backgroundColor: '#eeeeee',
		},
	}))

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
						onClick={e => {
							dispatch(setPage('Account'))
							dispatch(setCurrentUser(user.id))
						}}
					>
						<CardHeader
							avatar={
								<Avatar
									aria-label='recipe'
									alt={`User ${user.name}`}
									src={`/src/assets/usersPhoto/photo${user.id}.jpeg`}
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
