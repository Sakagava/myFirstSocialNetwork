import { useDispatch } from 'react-redux'
import { setPage } from '../store/navigation'
import { Typography, Box } from '@mui/material'
import Title from '../components/Title'
import { TitleWrap, MainButton } from '../styles/Home'

function Home() {
	const dispatch = useDispatch()

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
				<MainButton onClick={() => dispatch(setPage('Posts'))}>
					Read posts
				</MainButton>
				<MainButton>Create posts</MainButton>
			</Box>
		</div>
	)
}

export default Home
