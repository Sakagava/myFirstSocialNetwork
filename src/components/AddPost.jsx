import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addNewPost } from '../store/posts'

export const AddPost = () => {
	const authUser = useSelector(state => state.users.authUser)
	const [isFocus, setIsFocus] = useState(false)
	const [newPost, setNewPost] = useState({
		userId: authUser.id,
		title: '',
		body: '',
		comments: [],
	})
	const dispatch = useDispatch()

	const handleInputChange = e => {
		const { name, value } = e.target
		setNewPost(prevState => ({ ...prevState, [name]: value }))
	}

	const postIt = e => {
		e.preventDefault()
		const fieldIsEmpty = newPost.title !== '' && newPost.body !== ''
		if (fieldIsEmpty) {
			dispatch(addNewPost(newPost))
			setNewPost(prevState => {
				return { ...prevState, title: '', body: '' }
			})
			handleBlur()
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
				label='Post title'
				multiline
				maxRows={3}
				name='title'
				value={newPost.title}
				sx={{ width: '40%', marginBottom: '10px' }}
				onFocus={handleFocus}
				onChange={handleInputChange}
			/>
			{isFocus && (
				<>
					<TextField
						id='outlined-multiline-static'
						label='Post text'
						multiline
						maxRows={4}
						name='body'
						value={newPost.body}
						sx={{ width: '40%', marginBottom: '10px' }}
						onFocus={handleFocus}
						onChange={handleInputChange}
					/>

					<Button onClick={postIt} sx={{ width: '40%', height: '40px' }}>
						Publish
					</Button>
					<Button sx={{ width: '40%', height: '40px' }} onClick={handleBlur}>
						Close
					</Button>
				</>
			)}
		</>
	)
}
