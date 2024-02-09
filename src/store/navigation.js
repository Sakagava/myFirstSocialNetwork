import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	currentPage: 'Home',
}

const navigation = createSlice({
	name: 'navigation',
	initialState,
	reducers: {
		setPage(state, action) {
			state.currentPage = action.payload
		},
	},
})

export const { setPage } = navigation.actions
export default navigation.reducer
