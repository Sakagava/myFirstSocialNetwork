import React from 'react'
import {
	Modal,
	Box,
	CardHeader,
	Typography,
	Divider,
	Paper,
	IconButton,
	Badge,
	Avatar,
} from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useSelector, useDispatch } from 'react-redux'
import { setPage } from '../store/navigation'
import { setCurrentUser } from '../store/users'
import { handleClickLikeComment } from '../assets/utils/handlers'

const PostModal = ({ open, handleClose, post, handleClickAccount }) => {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)
	const dispatch = useDispatch()

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

	let commentsValue = 0
	try {
		commentsValue = post.comments.length
	} catch {
		commentsValue = 'Error'
	}

	const isLiked = post.like > 0

	return (
		<Modal
			open={open}
			onClose={handleClose}
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
				<Typography id='modal-modal-title' variant='h5' component='h2'>
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
						post.comments.map(comment => (
							<Paper
								sx={{
									marginBottom: '20px',
									padding: '10px',
									display: 'flex',
								}}
								variant='outlined'
								key={comment.id}
							>
								<Box>
									<Typography variant='h6'>
										{comment.name[0].toUpperCase() + comment.name.slice(1)}
									</Typography>
									<Typography variant='h9'>
										{comment.body[0].toUpperCase() + comment.body.slice(1)}
									</Typography>
								</Box>
								<Box>
									<IconButton
										aria-label='add to favorites'
										onClick={() =>
											handleClickLikeComment(
												post.id,
												comment.id,
												post,
												dispatch
											)
										}
									>
										<Badge badgeContent={comment.like} color='secondary'>
											{comment.isLiked ? (
												<FavoriteIcon />
											) : (
												<FavoriteBorderIcon />
											)}
										</Badge>
									</IconButton>
								</Box>
							</Paper>
						))}
				</Box>
			</Box>
		</Modal>
	)
}

export default PostModal
