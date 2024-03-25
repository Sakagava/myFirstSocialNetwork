import { CardHeader, Avatar, IconButton } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { TPost } from '../types/TPosts'
import { TUser } from '../types/TUsers'

type UserDieProps = {
	post: TPost
	user: TUser
}

export const UserDie: React.FC<UserDieProps> = ({ post, user }) => {
	return (
		<Link
			to={`/users/user/${user.id}`}
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
