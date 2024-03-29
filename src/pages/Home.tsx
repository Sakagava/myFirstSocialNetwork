import { Typography, Box, Grid } from '@mui/material'
import { Title } from '../components/Title'
import { MainButton } from '../styles/Home'
import { CenteringWrap } from '../styles/utils'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/rtkHooks'

export default function Home() {
	const authUser = useAppSelector(state => state.users.authUser)
	const pathCreatePost = authUser.name ? '/posts' : '/login'

	return (
		<Box className='home' padding={2}>
			<CenteringWrap>
				<Title>Join a friendly community</Title>
				<Typography marginBottom={'20px'}>
					Express your ideas in posts and read the ideas of other people from
					all over the planet
				</Typography>
			</CenteringWrap>
			<Grid container spacing={2} justifyContent='center'>
				<Grid item xs={12} md={6}>
					<Link to='/posts' style={{ textDecoration: 'none', width: '100%' }}>
						<MainButton
							sx={{
								height: { xs: '300px', sm: '350px', md: '750px' },
								fontSize: { xs: '30px', sm: '40px', md: '45px' },
							}}
							fullWidth
						>
							Read posts
						</MainButton>
					</Link>
				</Grid>
				<Grid item xs={12} md={6}>
					<Link
						to={pathCreatePost}
						style={{ textDecoration: 'none', width: '100%' }}
					>
						<MainButton
							sx={{
								height: { xs: '300px', sm: '600px', md: '750px' },
								fontSize: { xs: '30px', sm: '40px', md: '45px' },
							}}
							fullWidth
						>
							Create posts
						</MainButton>
					</Link>
				</Grid>
			</Grid>
		</Box>
	)
}
