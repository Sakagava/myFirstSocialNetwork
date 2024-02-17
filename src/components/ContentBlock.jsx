import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
import {
	CardContent,
	Typography,
	CardHeader,
	Avatar,
	IconButton,
	Paper,
	CardActions,
	Badge,
	Modal,
	Box,
} from '@mui/material'
import Divider from '@mui/material/Divider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import CommentIcon from '@mui/icons-material/Comment'
import { useMemo, useState } from 'react'
import { addLikeToPost } from '../store/posts'
import { addLikeToComment } from '../store/posts'

export default function ContentBlock({ post, handleClickAccount }) {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)
	const dispatch = useDispatch()
	const [open, setOpen] = useState(false)
	const styleModal = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: '50%',
		height: '90vh',
		bgcolor: 'background.paper',
		border: '2px solid #000',
		boxShadow: 24,
		p: 4,
		overflowY: 'auto',
	}
	const [likedComments, setLikedComments] = useState(new Set())

	let commentsValue = 0
	const isLiked = post.like > 0

	try {
		commentsValue = post.comments.length
	} catch {
		commentsValue = 'Заебал'
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

	function handleClickLikeComment(idComment) {
		if (likedComments.has(idComment)) {
			likedComments.delete(idComment)
		} else {
			likedComments.add(idComment)
		}
		setLikedComments(new Set(likedComments)) // обновляем состояние
		const newLikes = likedComments.has(idComment)
			? (post.comments.find(comment => comment.id === idComment)?.likes || 0) +
			  1
			: (post.comments.find(comment => comment.id === idComment)?.likes || 0) -
			  1

		dispatch(
			addLikeToComment({
				idComment: idComment,
				numOfLikes: newLikes,
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
					<IconButton
						aria-label='add to favorites'
						onClick={handleClickLikePost}
					>
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
				<CardHeader
					avatar={
						<Avatar
							aria-label='recipe'
							alt={`User ${post.userId}`}
							src={`/src/assets/img/usersPhoto/photo${post.userId}.jpeg`}
						/>
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
			<Modal
				open={open}
				onClose={() => setOpen(false)}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'
			>
				<Box sx={styleModal}>
					<CardHeader
						avatar={
							<Avatar
								aria-label='recipe'
								alt={`User ${post.userId}`}
								src={`/src/assets/img/usersPhoto/photo${post.userId}.jpeg`}
							/>
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
							marginBottom: '10px',
						}}
						onClick={() => {
							dispatch(setPage('Account'))
							dispatch(setCurrentUser(post.userId))
						}}
					/>
					<Typography id='modal-modal-title' variant='h6' component='h2'>
						{post.title[0].toUpperCase() + post.title.slice(1)}
					</Typography>
					<Typography
						id='modal-modal-description'
						sx={{ mt: 2, marginBottom: '20px' }}
					>
						{post.body[0].toUpperCase() + post.body.slice(1)}
					</Typography>
					<Divider sx={{ marginBottom: '20px' }} />
					<Box>
						{post.comments &&
							post.comments.map(comm => {
								return (
									<Paper
										sx={{
											marginBottom: '20px',
											padding: '10px',
											display: 'flex',
										}}
										variant='outlined'
									>
										<Box>
											<Typography variant='h6'>
												{comm.name[0].toUpperCase() + comm.name.slice(1)}
											</Typography>
											<Typography variant='h7'>
												{comm.body[0].toUpperCase() + comm.body.slice(1)}
											</Typography>
										</Box>
										<Box>
											<IconButton
												aria-label='add to favorites'
												onClick={() => handleClickLikeComment(comm.id)}
											>
												<Badge badgeContent={comm.likes} color='secondary'>
													{comm.likes ? (
														<FavoriteIcon />
													) : (
														<FavoriteBorderIcon />
													)}
												</Badge>
											</IconButton>
										</Box>
									</Paper>
								)
							})}
					</Box>
				</Box>
			</Modal>
		</>
	)
}
