import { useState, useEffect } from 'react'
import ContentBlock from '../components/ContentBlock'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, CircularProgress, Box, Button } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import Title from '../components/Title'
import { NoMorePosts } from '../styles/Content'
import { fetchPosts } from '../store/posts'
import { fetchUsers } from '../store/users'
import { AddPost } from '../components/AddPost'
import { Link } from 'react-router-dom'

export default function Content() {
	const posts = useSelector(state => state.posts.posts)
	const users = useSelector(state => state.users.users)
	const authUser = useSelector(state => state.users.authUser)
	const loadingData = useSelector(state => state.posts.loading)
	const dispatch = useDispatch()
	const [numberOfPosts, setNumberOfPosts] = useState(20)
	const [ref, inView] = useInView({
		threshold: 0.5,
		triggerOnce: true,
	})

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useEffect(() => {
		if (!posts.length) {
			dispatch(fetchPosts())
		}

		if (!users.length) {
			dispatch(fetchUsers())
		}
	}, [dispatch])

	useEffect(() => {
		setNumberOfPosts(numberOfPosts + 8)
	}, [inView])

	return (
		<>
			<Title>All posts</Title>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{authUser.name ? (
					<AddPost />
				) : (
					<Button
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
						component={Link}
						to={'/registration'}
					>
						Register to post
					</Button>
				)}
			</Box>

			<Grid container spacing={{ md: 2 }} p={5}>
				{posts.slice(0, numberOfPosts).map((post, index) => {
					return index === numberOfPosts - 1 ? (
						<Grid item xs={12} md={4} lg={3} key={post.id} ref={ref}>
							<ContentBlock post={post} numberOfPosts={numberOfPosts} />
						</Grid>
					) : (
						<Grid item xs={12} md={4} lg={3} key={post.id}>
							<ContentBlock post={post} numberOfPosts={numberOfPosts} />
						</Grid>
					)
				})}
			</Grid>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				{!loadingData && numberOfPosts >= posts.length ? (
					<NoMorePosts>No more posts</NoMorePosts>
				) : (
					<CircularProgress sx={{ color: 'black' }} />
				)}
			</Box>
		</>
	)
}
