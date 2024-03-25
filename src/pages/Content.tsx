import { useEffect } from 'react'
import { useAppSelector } from '../store/rtkHooks'
import { Button } from '@mui/material'
import { Title } from '../components/Title'

import { AddPost } from '../components/AddPost'
import { Link } from 'react-router-dom'
import { useFetchUsers } from '../hooks/useCheckUsers'
import { useFetchPosts } from '../hooks/useCheckPosts'
import { AllPosts } from '../components/Content/AllPosts'
import { CenteringWrap, CenteringWrapCSS } from '../styles/utils'

export const Content = () => {
	const authUser = useAppSelector(state => state.users.authUser)

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
					<Button sx={CenteringWrapCSS} component={Link} to={'/registration'}>
						Register to post
					</Button>
				)}
			</CenteringWrap>
			<AllPosts />
		</>
	)
}
