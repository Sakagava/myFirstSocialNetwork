import { useEffect } from 'react'
import { fetchPosts } from '../store/posts'
import { useAppDispatch, useAppSelector } from '../store/rtkHooks'

export const useFetchPosts = () => {
	const dispatch = useAppDispatch()
	const posts = useAppSelector(state => state.posts.posts)

	useEffect(() => {
		if (!posts.length) {
			dispatch(fetchPosts())
		}
	}, [dispatch, posts.length])
}
