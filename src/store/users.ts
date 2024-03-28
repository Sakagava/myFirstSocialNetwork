import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { TUserSignUp, TUser } from '../types/TUsers'
import { emptyUser } from '../utils/userObj'
import { TEditUserSchema } from '../utils/editUserProfile'

export const fetchUsers = createAsyncThunk<TUser[]>('fetchUsers', async () => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users')
	return await response.json()
})

export const signUp = createAsyncThunk<TUser, TUserSignUp>(
	'signUp',
	async user => {
		const response = await fetch('https://jsonplaceholder.typicode.com/users', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		})
		return await response.json()
	}
)

export const patchAuthUser = createAsyncThunk<TUser, TUser>(
	'patchAuthUser',
	async user => {
		const response = await fetch(
			`https://jsonplaceholder.typicode.com/users/${user.id}`,
			{
				method: 'PATCH',
				body: JSON.stringify(user),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			}
		)
		const data = await response.json()
		return data
	}
)

type UsersSlice = {
	users: TUser[]
	sortBy: string
	loading: boolean | null
	error: boolean | null
	authUser: TUser
}

const initialState: UsersSlice = {
	users: [],
	sortBy: '',
	loading: null,
	error: null,
	authUser: emptyUser as TUser,
}

const users = createSlice({
	name: 'users',
	initialState,
	reducers: {
		sortUsers: (state, action: PayloadAction<string>) => {
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
			state.authUser = emptyUser as TUser
		},

		logIn: (state, action: PayloadAction<TUser>) => {
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
		builder
			.addCase(fetchUsers.pending, state => {
				state.loading = true
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.users = action.payload
				state.loading = false
			})
			.addCase(signUp.pending, state => {
				state.loading = true
			})
			.addCase(signUp.fulfilled, (state, action) => {
				const nextId = state.users.length + 1
				const nextUser = { ...action.payload, id: nextId }
				state.authUser = nextUser
				state.users = [...state.users, nextUser]
				state.loading = false
			})
			.addCase(patchAuthUser.fulfilled, (state, action) => {
				const newData = action.payload
				const modifiedUser = { ...(state.authUser as TUser), ...newData }
				state.authUser = modifiedUser
				state.users = state.users.map(user => {
					return user.id === (state.authUser as TUser).id ? modifiedUser : user
				})
			})
	},
})

export const { sortUsers, logOut, logIn } = users.actions
export default users.reducer
