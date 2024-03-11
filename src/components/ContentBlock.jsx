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
import { useNavigate } from 'react-router-dom'

export default function ContentBlock({ post }) {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)
	const authUser = useSelector(state => state.users.authUser)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	let isLiked = post.likes ? post.likes.includes(authUser.id) : false
	const loading = useSelector(state => state.posts.loading)
	let likeValue = post.likes ? post.likes.length : 0
	let commentsValue = post.comments.length

	const navigate = useNavigate()

	function handleClickLikePost() {
		if (loading) {
			return
		}

		if (!authUser.username) {
			navigate('/login')
			return
		}

		const newLikesArr =
			post.likes == undefined
				? [authUser.id]
				: post.likes.includes(authUser.id)
				? post.likes.filter(id => id !== authUser.id)
				: post.likes.length == 0
				? [authUser.id]
				: [...post.like, authUser.id]
		dispatch(
			addLikeToPost({
				newLikesArr: newLikesArr,
				postId: post.id,
				userId: authUser.id,
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
						<Badge badgeContent={likeValue} color='secondary'>
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
