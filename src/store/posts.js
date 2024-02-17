import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts')
	return await response.json()
})

export const addLikeToPost = createAsyncThunk(
	'addLikeInPost',
	async ({ idPost, numOfLikes }) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${idPost}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					like: numOfLikes,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		return await response.json()
	}
)

export const addCommentsInPosts = createAsyncThunk(
	'addCommentsInPosts',
	async () => {
		const response = await fetch(
			'https://jsonplaceholder.typicode.com/comments'
		)
		return await response.json()
	}
)

export const addLikeToComment = createAsyncThunk(
	'addLikeToComment',
	async ({ idComment, numOfLikes }) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/comments/${idComment}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					like: numOfLikes,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		return await response.json()
	}
)

const posts = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		loading: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				state.loading = true
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts = action.payload
				state.loading = false
			})
			.addCase(addLikeToPost.fulfilled, (state, action) => {
				const index = state.posts.findIndex(
					post => post.id === action.payload.id
				)

				if (index !== -1) {
					state.posts[index].like = action.payload.like
				}
			})
			.addCase(addCommentsInPosts.fulfilled, (state, action) => {
				state.posts = state.posts.map(post => {
					post.comments = action.payload.filter(comm => comm.postId == post.id)
					return post
				})
			})
			.addCase(addLikeToComment.fulfilled, (state, action) => {
				const postIndex = state.posts.findIndex(
					post => post.id === action.payload.postId
				)
				const commentIndex = state.posts[postIndex].comments.findIndex(
					comment => comment.id === action.payload.id
				)

				if (postIndex !== -1) {
					state.posts[postIndex].comments[commentIndex] = {
						...state.posts[postIndex].comments[commentIndex],
						likes: action.payload.like,
					}
				}
			})
	},
})

export default posts.reducer
