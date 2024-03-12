import { CardHeader, Avatar, IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

export default function UserDie({ post, user }) {
	return (
		<Link
			to={`/myFirstSocialNetwork/users/user/${user.id}`}
			style={{ padding: '0', textDecoration: 'none', color: 'inherit' }}
		>
			<CardHeader
				avatar={<Avatar alt={`User ${post.userId}`}>{user.username[0]}</Avatar>}
				action={<IconButton></IconButton>}
				title={user?.username}
				subheader={user?.name}
				sx={{
					transition: '0.2s',
					cursor: 'pointer',
					':hover': {
						backgroundColor: '#eeeeee',
					},
				}}
			/>
		</Link>
	)
}
