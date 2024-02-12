import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
import {
	Card,
	CardContent,
	Typography,
	CardHeader,
	Avatar,
	IconButton,
	Paper,
} from '@mui/material'

export default function ContentBlock({ post, handleClickAccount }) {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)
	const dispatch = useDispatch()

	if (!user) {
		return null
	}

	return (
		<Paper
			variant='outlined'
			sx={{
				height: { xs: 350, sm: 240, md: 360, lg: 350, xl: 290 },
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
			}}
			key={post.id}
		>
			<CardContent>
				<Typography variant='h5' color='text.black' sx={{ my: 1 }}>
					{post.title[0].toUpperCase() + post.title.slice(1)}
				</Typography>
				<Typography variant='body2' color='text.secondary'>
					{post.body[0].toUpperCase() + post.body.slice(1)}
				</Typography>
			</CardContent>
			<CardHeader
				avatar={
					<Avatar
						aria-label='recipe'
						alt={`User ${post.userId}`}
						src={`/src/assets/usersPhoto/photo${post.userId}.jpeg`}
					></Avatar>
				}
				action={
					<IconButton
						aria-label='account'
						onClick={handleClickAccount}
					></IconButton>
				}
				title={user?.username}
				subheader={user?.name}
				sx={{
					transition: '0.2s',
					cursor: 'pointer',
					':hover': {
						backgroundColor: '#eeeeee',
					},
				}}
				onClick={() => {
					dispatch(setPage('Account'))
					dispatch(setCurrentUser(post.userId))
				}}
			/>
		</Paper>
	)
}
