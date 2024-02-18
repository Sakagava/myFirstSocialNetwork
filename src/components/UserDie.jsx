import { useDispatch } from 'react-redux'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
import { CardHeader, Avatar, IconButton } from '@mui/material'

export default function UserDie({ post, user }) {
	const dispatch = useDispatch()
	return (
		<CardHeader
			avatar={
				<Avatar
					alt={`User ${post.userId}`}
					src={`/src/assets/img/usersPhoto/photo${post.userId}.jpeg`}
				/>
			}
			action={<IconButton></IconButton>}
			title={user?.username}
			subheader={user?.name}
			sx={{
				transition: '0.2s',
				cursor: 'pointer',
				':hover': {
					backgroundColor: '#eeeeee',
				},
				marginBottom: '10px',
			}}
			onClick={() => {
				dispatch(setPage('Account'))
				dispatch(setCurrentUser(post.userId))
			}}
		/>
	)
}
