import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Button } from '@mui/material'
import Title from '../components/Title'

import { AddPost } from '../components/AddPost'
import { Link } from 'react-router-dom'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { useFetchPosts } from '../hooks/useCheckPosts'
import { AllPosts } from '../components/Content/AllPosts'
import { CenteringWrap, CenteringWrapCSS } from '../styles/utils'

export default function Content() {
	const authUser = useSelector(state => state.users.authUser)

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [])

	useFetchPosts()
	useFetchUsers()

	return (
		<>
			<Title>All posts</Title>
			<CenteringWrap>
				{authUser.name ? (
					<AddPost />
				) : (
					<Button
						sx={CenteringWrapCSS}
						component={Link}
						to={'/myFirstSocialNetwork/registration'}
					>
						Register to post
					</Button>
				)}
			</CenteringWrap>
			<AllPosts />
		</>
	)
}
