import { useState } from 'react'
import ContentBlock from './ContentBlock'
import { useSelector } from 'react-redux'
import { Grid, Button, Container, Typography, Box } from '@mui/material'

export default function Content() {
	const posts = useSelector(state => state.posts.posts)
	const [numberOfPosts, setNumberOfPosts] = useState(8)

	function handleClickShowMore() {
		setNumberOfPosts(numberOfPosts + 8)
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Typography variant='h1' fontSize={52}>
					All posts
				</Typography>
			</Box>
			<Grid container spacing={{ md: 2 }} p={5}>
				{posts.slice(0, numberOfPosts).map(post => {
					return (
						<Grid item xs={12} md={4} lg={3} key={post.id}>
							<ContentBlock post={post} />
						</Grid>
					)
				})}
			</Grid>
			{posts.length > 0 && (
				<Container
					sx={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						p: 0,
					}}
				>
					{numberOfPosts < posts.length ? (
						<Button variant='text' onClick={handleClickShowMore}>
							Show more
						</Button>
					) : (
						<Typography>No more posts</Typography>
					)}
				</Container>
			)}
		</>
	)
}
