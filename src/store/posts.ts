import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { TPost } from '../types/TPosts'
import { TComment } from '../types/TComments'

export const fetchPosts = createAsyncThunk<{
	dataPosts: TPost[]
	dataComments: TComment[]
}>('fetchPosts', async () => {
	const responsePosts = await fetch(
		'https://jsonplaceholder.typicode.com/posts'
	)
	const dataPosts: TPost[] = await responsePosts.json()
	const responseComments = await fetch(
		'https://jsonplaceholder.typicode.com/comments'
	)
	const dataComments: TComment[] = await responseComments.json()
	return { dataPosts, dataComments }
})

type LikePostData = {
	newLikesArr: number[]
	postId: number
	userId: number
}

type ReturnLikePostData = {
	likes: number[]
}

export const addLikeToPost = createAsyncThunk(
	'addLikeInPost',
	async ({ newLikesArr, postId }: LikePostData) => {
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
		const data: ReturnLikePostData = await response.json()
		return data.likes
	}
)

export type LikeCommentData = {
	idComment: number
	numOfLikes: number[] | []
	postId: number
}

export const addLikeToComment = createAsyncThunk(
	'addLikeToComment',
	async ({ idComment, numOfLikes, postId }: LikeCommentData) => {
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
		return { data, idComment, postId }
	}
)

export const addNewPost = createAsyncThunk<TPost, TPost>(
	'addNewPost',
	async post => {
		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify(post),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		return await response.json()
	}
)

export const addNewComment = createAsyncThunk<TComment[], TComment[]>(
	'addNewComment',
	async comment => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/posts/${
				comment[comment.length - 1].postId
			}`,
			{
				method: 'PATCH',
				body: JSON.stringify({
					comments: [comment],
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

type PostsSlice = {
	posts: TPost[]
	loading: boolean | null
	commentValue: number
}

const initialState: PostsSlice = {
	posts: [],
	loading: null,
	commentValue: 0,
}

const posts = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		initPosts: (state, action) => {
			state.posts = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, state => {
				if (!state.posts.length) {
					state.loading = true
				}
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				if (!state.posts.length) {
					const posts = action.payload.dataPosts.map(post => {
						post.comments = action.payload.dataComments.filter(
							comm => comm.postId === post.id
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
				const postId = action.meta.arg.postId
				const newLikesArr = action.payload
				state.posts = state.posts.map(post =>
					post.id === postId ? { ...post, likes: newLikesArr } : post
				)
				state.loading = false
			})
			.addCase(addLikeToPost.rejected, state => {
				state.loading = false
			})
			.addCase(addLikeToComment.pending, state => {
				state.loading = true
			})
			.addCase(addLikeToComment.fulfilled, (state, action) => {
				const { data, idComment, postId } = action.payload
				const newLikesArr = data.likes
				if (postId !== -1) {
					state.posts = state.posts.map(post => {
						if (post.id === postId && post.comments) {
							post.comments = post.comments.map(comment => {
								return comment.id === idComment
									? { ...comment, likes: newLikesArr }
									: comment
							})
						}
						return post
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
				state.posts = state.posts.map(post =>
					post.id === action.payload[0].postId
						? { ...post, comments: action.payload }
						: post
				)
			})
	},
})

export const { initPosts } = posts.actions
export default posts.reducer
