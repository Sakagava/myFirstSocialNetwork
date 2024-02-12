import { useDispatch } from 'react-redux'
import { setPage } from '../../store/navigation'
import { Typography, Box, Button } from '@mui/material'

function Home() {
	const dispatch = useDispatch()
	return (
		<div className='home'>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					paddingTop: '20px',
				}}
			>
				<Typography variant='h1' fontSize={52}>
					Join a friendly community
				</Typography>
				<Typography marginBottom={'20px'}>
					Express your ideas in posts and read the ideas of other people from
					all over the planet
				</Typography>
			</Box>
			<Box
				sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
			>
				<Button
					onClick={() => dispatch(setPage('Posts'))}
					sx={{
						width: '49.5%',
						height: '730px',
						cursor: 'pointer',
						fontSize: '50px',
						// backgroundColor: '#f8f3eb',
						borderRadius: '20px',
						transition: '0.5s',
					}}
				>
					Read posts
				</Button>
				<Button
					sx={{
						width: '49.5%',
						height: '730px',
						cursor: 'pointer',
						fontSize: '50px',
						// backgroundColor: '#f8f3eb',
						borderRadius: '20px',
						transition: '0.5s',
					}}
				>
					Create posts
				</Button>
			</Box>
		</div>
	)
}

export default Home
