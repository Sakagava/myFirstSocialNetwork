import { Paper, Box, Typography, Badge, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addLikeToComment } from '../store/posts'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/rtkHooks'
import { TComment } from '../types/TComments'

export const Comment: React.FC<{ comment: TComment }> = ({ comment }) => {
	const dispatch = useAppDispatch()
	const authUser = useAppSelector(state => state.users.authUser)
	let isLiked =
		comment.likes && authUser.id && comment.likes.includes(authUser.id)
	let likeValue = comment.likes ? comment.likes.length : 0
	const loading = useAppSelector(state => state.posts.loading)
	const navigate = useNavigate()

	function handleClickLikeComment() {
		if (loading) {
			return
		}

		if (!authUser.username) {
			navigate('/login')
			return
		}

		isLiked ? likeValue-- : likeValue++
		isLiked = !isLiked

		let newLikesArr: number[] = []

		if (comment.likes === undefined || comment.likes.length === 0) {
			newLikesArr = [authUser.id]
		} else {
			const isUserLiked = authUser.id && comment.likes.includes(authUser.id)

			if (isUserLiked) {
				newLikesArr = comment.likes.filter(id => id !== authUser.id)
			} else {
				newLikesArr = [...comment.likes, authUser.id]
			}
		}

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
				<Typography variant='subtitle1'>
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
