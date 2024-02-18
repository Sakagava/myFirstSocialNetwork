import { useState, useEffect } from 'react'
import ContentBlock from '../components/ContentBlock'
import { useSelector } from 'react-redux'
import { Grid, CircularProgress, Box } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import Title from '../components/Title'
import { NoMorePosts } from '../styles/Content'

export default function Content() {
	const posts = useSelector(state => state.posts.posts)
	const [numberOfPosts, setNumberOfPosts] = useState(20)
	const [ref, inView] = useInView({
		threshold: 0.5,
		triggerOnce: true,
	})

	useEffect(() => {
		setNumberOfPosts(numberOfPosts + 8)
	}, [inView])

	return (
		<>
			<Title>All posts</Title>
			<Grid container spacing={{ md: 2 }} p={5}>
				{posts.slice(0, numberOfPosts).map((post, index) => {
					return index + 1 == numberOfPosts ? (
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
				{numberOfPosts >= posts.length ? (
					<NoMorePosts>No more posts</NoMorePosts>
				) : (
					<CircularProgress sx={{ color: 'black' }} />
				)}
			</Box>
		</>
	)
}
