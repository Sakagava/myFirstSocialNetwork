import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts } from '../store/posts'

export const useFetchPosts = () => {
	const dispatch = useDispatch()
	const posts = useSelector(state => state.posts.posts)

	useEffect(() => {
		if (!posts.length) {
			dispatch(fetchPosts())
		}
	}, [dispatch, posts.length])
}
