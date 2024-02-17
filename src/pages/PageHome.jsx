import { useDispatch } from 'react-redux'
import { setPage } from '../store/navigation'
import { Typography, Box, Button } from '@mui/material'
import styled from '@emotion/styled'
import Title from '../styles/Title'

function Home() {
	const dispatch = useDispatch()
	const TitleWrap = styled(Box)(() => ({
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		paddingTop: '20px',
	}))
	const MainButton = styled(Button)(() => ({
		width: '49.5%',
		height: '730px',
		cursor: 'pointer',
		fontSize: '50px',
		borderRadius: '20px',
		transition: '0.5s',
	}))

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
