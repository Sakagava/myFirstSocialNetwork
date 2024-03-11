import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	return await response.json()
})

export const userRegister = createAsyncThunk('userRegister', async user => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users', {
		method: 'POST',
		body: JSON.stringify(user),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	})
	return await response.json()
})

export const patchAuthUser = createAsyncThunk('patchAuthUser', async user => {
	const newUserData = user[0]
	const userId = user[1]
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/users/${userId}`,
		{
			method: 'PATCH',
			body: JSON.stringify(newUserData),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		}
	)
	const data = await response.json()
	return data
})

const users = createSlice({
	name: 'users',
	initialState: {
		users: [],
		sortBy: '',
		loading: null,
		error: null,
		authUser: {},
	},
	reducers: {
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

		logOut: state => {
			state.authUser = {}
		},

		logIn: (state, action) => {
			const { username, password } = action.payload
			const user = state.users.filter(user => {
				if (user.username == username && user.password == password) {
					return user
				}
			})
			state.authUser = user[0]
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchUsers.pending, state => {
			state.loading = true
		})
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.users = action.payload
			state.loading = false
		})
		builder.addCase(userRegister.pending, state => {
			state.loading = true
		})
		builder.addCase(userRegister.fulfilled, (state, action) => {
			const nextId = state.users.length + 1
			const nextUser = { ...action.payload, id: nextId }
			state.authUser = nextUser
			state.users = [...state.users, nextUser]
			state.loading = false
		})
		builder.addCase(patchAuthUser.fulfilled, (state, action) => {
			const newData = action.payload
			const modifiedUser = { ...state.authUser, ...newData }
			state.authUser = modifiedUser
			state.users = state.users.map(user => {
				return user.id == state.authUser.id ? modifiedUser : user
			})
		})
	},
})

export const { sortUsers, logOut, logIn } = users.actions
export default users.reducer
