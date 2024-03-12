import { Paper, Box, Typography, Badge, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addLikeToComment } from '../store/posts'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Comment({ comment }) {
	const dispatch = useDispatch()
	const authUser = useSelector(state => state.users.authUser)
	let isLiked = comment.likes ? comment.likes.includes(authUser.id) : false
	let likeValue = comment.likes ? comment.likes.length : 0
	const loading = useSelector(state => state.posts.loading)
	const navigate = useNavigate()

	function handleClickLikeComment() {
		if (loading) {
			return
		}

		if (!authUser.username) {
			navigate('/myFirstSocialNetwork/login')
			return
		}

		isLiked ? likeValue-- : likeValue++
		isLiked = !isLiked
		const newLikesArr =
			comment.likes == undefined
				? [authUser.id]
				: comment.likes.includes(authUser.id)
				? comment.likes.filter(id => id !== authUser.id)
				: comment.likes.length == 0
				? [authUser.id]
				: [...comment.likes, authUser.id]

		dispatch(
			addLikeToComment({
				idComment: comment.id,
				numOfLikes: newLikesArr,
				postId: comment.postId,
			})
		)
	}

	return (
		<Paper
			sx={{
				marginBottom: '20px',
				padding: '10px',
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
			variant='outlined'
			key={comment.id}
		>
			<Box sx={{ flexGrow: 1 }}>
				<Typography variant='h6'>
					{comment.name[0].toUpperCase() + comment.name.slice(1)}
				</Typography>
				<Typography variant='h7'>
					{comment.body[0].toUpperCase() + comment.body.slice(1)}
				</Typography>
			</Box>
			<IconButton
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
				onClick={handleClickLikeComment}
			>
				<Badge badgeContent={likeValue} color='secondary'>
					{isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
				</Badge>
			</IconButton>
		</Paper>
	)
}
