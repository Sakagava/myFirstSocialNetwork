import { useState } from 'react'
import './ContentBlock.css'
import ContentBlock from './ContentBlock'
import { useSelector } from 'react-redux'

export default function Content() {
	const posts = useSelector(state => state.posts.posts)
	const [numberOfPosts, setNumberOfPosts] = useState(8)

	function handleClickShowMore() {
		setNumberOfPosts(numberOfPosts + 8)
	}

	return (
		<>
			<div className='heading'>
				<h1>All posts</h1>
			</div>
			<div className='content'>
				{posts.slice(0, numberOfPosts).map(post => {
					return <ContentBlock post={post} key={post.id} />
				})}
			</div>
			{posts.length > 0 && (
				<div className='content_lastElem'>
					{numberOfPosts < posts.length ? (
						<span onClick={handleClickShowMore}>Show more</span>
					) : (
						<p>No more posts</p>
					)}
				</div>
			)}
		</>
	)
}
