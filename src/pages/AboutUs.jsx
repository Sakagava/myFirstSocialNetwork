import { Container, Typography } from '@mui/material'
import Title from '../styles/Title'

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
			<Title>About</Title>
			<Typography textAlign='center'>
				On this project, I consolidated my knowledge acquired <br />
				while studying the React documentation
			</Typography>
		</Container>
	)
}

export default AboutUs
