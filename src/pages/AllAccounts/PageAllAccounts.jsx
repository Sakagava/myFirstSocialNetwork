import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortUsers } from '../../store/users'
import { setPage } from '../../store/navigation'
import { setCurrentUser } from '../../store/users'
import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	Container,
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from '@mui/material'

function PageAllAccounts() {
	const users = useSelector(state => state.users.users)
	const dispatch = useDispatch()
	const [sortBy, setSortBy] = React.useState('')

	const handleChange = e => {
		setSortBy(e.target.value)
		dispatch(sortUsers(e.target.value.toLowerCase()))
	}

	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					width: '100%',
					marginBottom: 2,
				}}
			>
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
			</Box>
			{users.map(user => {
				return (
					<Card
						sx={{
							height: { xs: 135, sm: 135, md: 135, lg: 135, xl: 135 },
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
							marginBottom: 1,
							cursor: 'pointer',
							transition: '0.2s',
							':hover': {
								backgroundColor: '#3f50b5',
								color: 'white',
								'& .MuiCardHeader-subheader': {
									color: '#e8eaf6',
								},
							},
						}}
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
					</Card>
				)
			})}
		</Container>
	)
}

export default PageAllAccounts
