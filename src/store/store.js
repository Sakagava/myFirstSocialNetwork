import { configureStore } from '@reduxjs/toolkit'
import users from './users'
import posts from './posts'
import navigation from './navigation'

export default configureStore({
	reducer: {
		users,
		posts,
		navigation,
	},
})
