import { useDispatch, useSelector } from 'react-redux'
import {
	CardContent,
	Typography,
	IconButton,
	Paper,
	CardActions,
	Badge,
	Modal,
	Box,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import { useState } from 'react'
import { addLikeToPost } from '../store/posts'
import PostModal from './PostModal'
import UserDie from './UserDie'

export default function ContentBlock({ post }) {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)

	let commentsValue = 0
	const isLiked = post.like > 0

	try {
		commentsValue = post.comments.length
	} catch {
		commentsValue = 'Error'
	}

	function handleClickLikePost() {
		const newLikeCount = post.like ? (post.like || 0) - 1 : (post.like || 0) + 1
		dispatch(
			addLikeToPost({
				idPost: post.id,
				numOfLikes: newLikeCount,
			})
		)
	}

	return (
		<>
			<Paper
				variant='outlined'
				sx={{
					height: { xs: 420, sm: 280, md: 440, lg: 390, xl: 350 },
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
				}}
				key={post.id}
			>
				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'end',
						pr: {
							xs: 2,
						},
					}}
				>
					<IconButton onClick={handleClickLikePost}>
						<Badge badgeContent={post.like} color='secondary'>
							{isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
						</Badge>
					</IconButton>
					<IconButton onClick={() => setOpen(true)}>
						<Badge badgeContent={commentsValue} color='secondary'>
							<CommentIcon />
						</Badge>
					</IconButton>
				</CardActions>

				<CardContent>
					<Typography
						variant='h5'
						color='text.black'
						sx={{ marginBottom: '10px' }}
					>
						{post.title[0].toUpperCase() + post.title.slice(1)}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{post.body[0].toUpperCase() + post.body.slice(1)}
					</Typography>
				</CardContent>
				<UserDie post={post} user={user} />
			</Paper>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Box>
					<PostModal post={post} user={user} />
				</Box>
			</Modal>
		</>
	)
}
