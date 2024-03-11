import { Typography, Box } from '@mui/material'
import Title from '../components/Title'
import { TitleWrap, MainButton } from '../styles/Home'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
	const authUser = useSelector(state => state.users.authUser)
	const pathCreatePost = authUser.name ? '/posts' : '/registration'

	return (
		<div className='home'>
			<TitleWrap>
				<Title>Join a friendly community</Title>
				<Typography marginBottom={'20px'}>
					Express your ideas in posts and read the ideas of other people from
					all over the planet
				</Typography>
			</TitleWrap>
			<Box display={'flex'} justifyContent={'space-between'} w={'100%'}>
				<MainButton component={Link} to={'/posts'}>
					Read posts
				</MainButton>

				<MainButton component={Link} to={pathCreatePost}>
					Create posts
				</MainButton>
			</Box>
		</div>
	)
}

export default Home
