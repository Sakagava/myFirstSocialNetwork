import { useState, useEffect } from 'react'
import ContentBlock from '../components/ContentBlock'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, CircularProgress, Box } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import Title from '../components/Title'
import { NoMorePosts } from '../styles/Content'
import { fetchPosts } from '../store/posts'
import { fetchUsers } from '../store/users'

export default function Content() {
	const posts = useSelector(state => state.posts.posts)
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
		dispatch(fetchPosts())
		dispatch(fetchUsers())
	}, [dispatch])

	useEffect(() => {
		setNumberOfPosts(numberOfPosts + 8)
	}, [inView])

	return (
		<>
			<Title>All posts</Title>
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
