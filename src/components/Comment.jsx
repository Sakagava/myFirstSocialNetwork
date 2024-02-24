import { Paper, Box, Typography, Badge, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { addLikeToComment } from '../store/posts'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'

export default function Comment({ post, comment }) {
	const dispatch = useDispatch()
	const [isLiked, setIsLiked] = useState(comment.likes > 0)
	const [likeValue, setLikeValue] = useState(comment.likes)
	const loading = useSelector(state => state.posts.loading)

	function handleClickLikeComment() {
		if (loading) {
			return
		}

		setIsLiked(!isLiked)
		const newLikeCount = comment.likes ? 0 : comment.likes + 1
		if (likeValue == undefined) {
			setLikeValue(1)
		} else {
			setLikeValue(newLikeCount)
		}

		dispatch(
			addLikeToComment({
				idComment: comment.id,
				numOfLikes: newLikeCount,
			})
		)
	}

	return (
		<Paper
			sx={{
				marginBottom: '20px',
				padding: '10px',
				display: 'flex',
				justifyContent: 'space-between', // Добавлено для центрирования
				alignItems: 'center', // Добавлено для центрирования
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
