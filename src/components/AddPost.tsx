import { Button, TextField } from '@mui/material'
import { useState, ChangeEvent, MouseEvent } from 'react'
import { addNewPost } from '../store/posts'
import { useAppSelector, useAppDispatch } from '../store/rtkHooks'
import { TPost } from '../types/TPosts'

export const AddPost = () => {
	const authUser = useAppSelector(state => state.users.authUser)
	const [isFocus, setIsFocus] = useState(false)
	const [newPost, setNewPost] = useState<TPost>({
		userId: authUser.id,
		id: 0,
		title: '',
		body: '',
		comments: [],
	})
	const dispatch = useAppDispatch()

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target
		setNewPost(prevState => ({ ...prevState, [name]: value }))
	}

	const postIt = (e: MouseEvent<HTMLButtonElement>) => {
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
				style={{ width: '40%', marginBottom: '10px' }}
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
						style={{ width: '40%', marginBottom: '10px' }}
						onFocus={handleFocus}
						onChange={handleInputChange}
					/>

					<Button onClick={postIt} style={{ width: '40%', height: '40px' }}>
						Publish
					</Button>
					<Button style={{ width: '40%', height: '40px' }} onClick={handleBlur}>
						Close
					</Button>
				</>
			)}
		</>
	)
}
