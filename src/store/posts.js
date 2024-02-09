import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/posts')
	const data = await response.json()
	return data.sort(() => Math.random() - 0.5)
})

const posts = createSlice({
	name: 'posts',
	initialState: {
		posts: [],
		status: null,
		error: null,
	},
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchPosts.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.posts = action.payload
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.status = 'error'
			})
	},
})

export default posts.reducer
