import { Paper, Box, Typography, Badge, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { handleClickLikeComment } from '../assets/utils/handlers'
import { useDispatch } from 'react-redux'

export default function Comment({ post, comment }) {
	const dispatch = useDispatch()
	return (
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
				<Typography variant='h7'>
					{comment.body[0].toUpperCase() + comment.body.slice(1)}
				</Typography>
			</Box>
			<Box>
				<IconButton
					onClick={() => handleClickLikeComment(dispatch, post, comment.id)}
				>
					<Badge badgeContent={comment.likes} color='secondary'>
						{comment.likes == 1 ? <FavoriteIcon /> : <FavoriteBorderIcon />}
					</Badge>
				</IconButton>
			</Box>
		</Paper>
	)
}
