import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
	const responsePosts = await fetch(
		'https://jsonplaceholder.typicode.com/posts'
	)
	const dataPosts = await responsePosts.json()
	const responseComments = await fetch(
		'https://jsonplaceholder.typicode.com/comments'
	)
	const dataComments = await responseComments.json()
	return { dataPosts, dataComments }
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
				if (state.posts[0] == undefined) {
					state.loading = true
				}
			})

			.addCase(fetchPosts.fulfilled, (state, action) => {
				if (state.posts[0] == undefined) {
					const posts = action.payload.dataPosts.map(post => {
						post.comments = action.payload.dataComments.filter(
							comm => comm.postId == post.id
						)
						return post
					})
					state.posts = posts
					state.loading = false
				}
			})

			.addCase(addLikeToPost.pending, state => {
				state.loading = true
			})

			.addCase(addLikeToPost.fulfilled, (state, action) => {
				const index = state.posts.findIndex(
					post => post.id === action.payload.id
				)

				if (index !== -1) {
					state.posts[index].like = action.payload.like
				}
				state.loading = false
			})

			.addCase(addLikeToComment.pending, state => {
				state.loading = true
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
				state.loading = false
			})
	},
})

export const { initPosts } = posts.reducer
export default posts.reducer
