import { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { Grid, CircularProgress } from '@mui/material'
import ContentBlock from './ContentBlock'
import { useSelector } from 'react-redux'
import { CenteringWrap } from '../../styles/utils'
import { NoMorePosts } from '../../styles/Content'

export const AllPosts = () => {
	const posts = useSelector(state => state.posts.posts)
	const [numberOfPosts, setNumberOfPosts] = useState(20)
	const loadingData = useSelector(state => state.posts.loading)
	const [ref, inView] = useInView({
		threshold: 0.5,
		triggerOnce: true,
	})

	useEffect(() => {
		setNumberOfPosts(numberOfPosts + 8)
	}, [inView])

	return (
		<>
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
			<CenteringWrap>
				{!loadingData && numberOfPosts >= posts.length ? (
					<NoMorePosts>No more posts</NoMorePosts>
				) : (
					<CircularProgress sx={{ color: 'black' }} />
				)}
			</CenteringWrap>
		</>
	)
}
