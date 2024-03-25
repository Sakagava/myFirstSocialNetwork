import { Box, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { addNewComment } from '../store/posts'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/rtkHooks'
import { TPost } from '../types/TPosts'
import { TComment } from '../types/TComments'

export const AddComment: React.FC<{ post: TPost }> = ({ post }) => {
	const [isFocus, setIsFocus] = useState(false)
	const amountOfComments = useAppSelector(state => state.posts.commentValue)
	const navigate = useNavigate()
	const authUser = useAppSelector(state => state.users.authUser)

	const [newComment, setNewComment] = useState<TComment>({
		postId: post.id,
		id: amountOfComments,
		name: '',
		email: authUser.email,
		body: '',
		likes: [],
	})

	const dispatch = useAppDispatch()

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewComment(prevState => ({ ...prevState, [name]: value }))
	}

	const postIt = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault()

		if (authUser.name) {
			const fieldIsEmpty = newComment.name !== '' && newComment.body !== ''
			if (fieldIsEmpty) {
				if (post.comments) {
					dispatch(addNewComment([...post.comments, newComment]))
				} else {
					dispatch(addNewComment([newComment]))
				}
				setNewComment({
					postId: post.id,
					id: amountOfComments + 1,
					email: authUser.email,
					name: '',
					body: '',
					likes: [],
				})
			}
		} else {
			navigate('/login')
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
