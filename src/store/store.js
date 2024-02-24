import { configureStore } from '@reduxjs/toolkit'
import users from './users'
import posts from './posts'

export default configureStore({
	reducer: {
		users,
		posts,
	},
})
