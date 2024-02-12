import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	return await response.json()
})

const users = createSlice({
	name: 'users',
	initialState: {
		users: [],
		sortBy: 'name',
		status: null,
		error: null,
		currentUser: {},
	},
	reducers: {
		setCurrentUser: (state, action) => {
			state.currentUser = state.users.find(user => user.id === action.payload)
		},
		sortUsers: (state, action) => {
			state.sortBy = action.payload
			switch (action.payload) {
				case 'name':
					state.users = [
						...state.users.sort((user, nextUser) => {
							if (user.name < nextUser.name) return -1
							if (user.name > nextUser.name) return 1
							return 0
						}),
					]
					break

				case 'username':
					state.users = [
						...state.users.sort((user, nextUser) => {
							if (user.username < nextUser.username) return -1
							if (user.username > nextUser.username) return 1
							return 0
						}),
					]
					break
			}
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload
		})
	},
})

export const { setCurrentUser, sortUsers } = users.actions
export default users.reducer
