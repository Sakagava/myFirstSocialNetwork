import { fetchPosts, addCommentsInPosts } from '../store/posts'
import { fetchUsers } from '../store/users'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

export default async function loader() {
	const dispatch = useDispatch()
	await dispatch(fetchPosts())
	await dispatch(fetchUsers())
	await dispatch(addCommentsInPosts())
	const posts = await useSelector(state => state.posts.posts)
	const users = await useSelector(state => state.users.users)
	return { posts, users }
}
