import { Container, Typography } from '@mui/material'

function AboutUs() {
	return (
		<Container
			sx={{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				height: '75vh',
			}}
		>
			<Typography variant='h1' color='text.black'>
				About
			</Typography>
			<Typography sx={{ textAlign: 'center' }}>
				On this project, I consolidated my knowledge acquired <br />
				while studying the React documentation
			</Typography>
		</Container>
	)
}

export default AboutUs
