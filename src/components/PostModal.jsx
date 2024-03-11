import { Typography, Box } from '@mui/material'
import Divider from '@mui/material/Divider'
import Comment from './Comment'
import UserDie from './UserDie'
import { postModal } from '../styles/Content'
import { AddComment } from './AddComment'

export default function PostModal({ user, post }) {
	return (
		<Box sx={postModal}>
			<UserDie post={post} user={user} />
			<Typography variant='h6' component='h2'>
				{post.title[0].toUpperCase() + post.title.slice(1)}
			</Typography>
			<Typography sx={{ mt: 2, marginBottom: '20px' }}>
				{post.body[0].toUpperCase() + post.body.slice(1)}
			</Typography>
			<Divider sx={{ marginBottom: '20px' }} />
			<Box>
				{post.comments &&
					post.comments.map(comment => {
						return <Comment key={comment.id} post={post} comment={comment} />
					})}
			</Box>
			<AddComment post={post} />
		</Box>
	)
}
