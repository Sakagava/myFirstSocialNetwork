import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewComment } from '../store/posts'

export const AddComment = post => {
	const [isFocus, setIsFocus] = useState(false)
	const amountOfComments = useSelector(state => state.posts.commentValue)
	const [newComment, setNewComment] = useState({
		postId: post.post.id,
		id: amountOfComments,
		name: '',
		body: '',
		likes: [],
	})

	const dispatch = useDispatch()

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewComment(prevState => ({ ...prevState, [name]: value }))
	}

	const postIt = e => {
		e.preventDefault()
		const fieldIsEmpty = newComment.name !== '' && newComment.body !== ''
		if (fieldIsEmpty) {
			dispatch(addNewComment([...post.post.comments, newComment]))
			setNewComment({
				postId: post.post.id,
				id: amountOfComments + 1,
				name: '',
				body: '',
				likes: [],
			})
		}
	}

	const handleFocus = () => {
		setIsFocus(true)
	}
	const handleBlur = () => {
		setIsFocus(false)
	}

	return (
		<>
			<TextField
				id='outlined-multiline-static'
				label='Comment title'
				multiline
				maxRows={3}
				name='name'
				value={newComment.name}
				sx={{ width: '100%', marginBottom: '10px' }}
				onFocus={handleFocus}
				onChange={handleInputChange}
			/>

			{isFocus && (
				<>
					<TextField
						id='outlined-multiline-static'
						label='Comment text'
						multiline
						maxRows={4}
						name='body'
						sx={{ width: '100%', marginBottom: '10px' }}
						value={newComment.body}
						onFocus={handleFocus}
						onChange={handleInputChange}
					/>
					<Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
						<Button onClick={postIt} sx={{ width: '40%', height: '40px' }}>
							Publish
						</Button>
						<Button sx={{ width: '40%', height: '40px' }} onClick={handleBlur}>
							Close
						</Button>
					</Box>
				</>
			)}
		</>
	)
}
