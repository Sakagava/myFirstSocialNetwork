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
	async ({ newLikesArr, postId, userId }) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${postId}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					likes: newLikesArr,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		const data = await response.json()
		return [data, postId, userId]
	}
)

export const addLikeToComment = createAsyncThunk(
	'addLikeToComment',
	async ({ idComment, numOfLikes, postId }) => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/comments/${idComment}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					likes: numOfLikes,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		const data = await response.json()
		return [data, idComment, postId]
	}
)

export const addNewPost = createAsyncThunk('addNewPost', async post => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
		method: 'POST',
		body: JSON.stringify(post),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
	return await response.json()
})

export const addNewComment = createAsyncThunk(
	'addNewComment',
	async comments => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${comments.postId}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					comments: comments,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)

		const data = await response.json()
		return data
	}
)

const posts = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		loading: null,
		commentValue: 0,
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
					state.posts = posts.reverse()
					state.commentValue = action.payload.dataComments.length + 1
					state.loading = false
				}
			})

			.addCase(addLikeToPost.pending, state => {
				state.loading = true
			})

			.addCase(addLikeToPost.fulfilled, (state, action) => {
				const newLikesArr = action.payload[0].likes
				const postId = action.payload[1]
				state.posts = state.posts.map(post => {
					return post.id == postId ? { ...post, likes: newLikesArr } : post
				})
				state.loading = false
			})

			.addCase(addLikeToPost.rejected, state => {
				state.loading = false
			})

			.addCase(addLikeToComment.pending, state => {
				state.loading = true
			})

			.addCase(addLikeToComment.fulfilled, (state, action) => {
				const newLikesArr = action.payload[0].likes
				const commentId = action.payload[1]
				const postId = action.payload[2]

				if (postId !== -1) {
					state.posts.map(post => {
						return post.id == postId
							? post.comments.map(comment => {
									return comment.id == commentId
										? (comment.likes = newLikesArr)
										: comment
							  })
							: post
					})
				}
				state.loading = false
			})
			.addCase(addNewPost.pending, state => {
				state.loading = true
			})
			.addCase(addNewPost.fulfilled, (state, action) => {
				const nextId = state.posts.length + 1
				const nextPost = { ...action.payload, id: nextId }
				state.posts = [nextPost, ...state.posts]
				state.loading = false
			})

			.addCase(addNewComment.fulfilled, (state, action) => {
				const nextId = state.commentValue + 1
				state.commentValue = nextId
				state.posts = state.posts.map(post => {
					return post.id == action.payload.comments[0].postId
						? { ...post, comments: action.payload.comments }
						: post
				})
			})
	},
})

export const { initPosts } = posts.reducer
export default posts.reducer
