import { Typography } from '@mui/material'
import { Title } from '../components/Title'
import { CenteringWrap } from '../styles/utils'

export const AboutUs: React.FC = () => {
	return (
		<CenteringWrap height={'75vh'}>
			<Title>About</Title>
			<Typography textAlign='center'>
				On this project, I consolidated my knowledge acquired <br />
				while studying the React documentation
			</Typography>
		</CenteringWrap>
	)
}

export default AboutUs
