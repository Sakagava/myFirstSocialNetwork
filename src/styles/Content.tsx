import styled from '@emotion/styled'
import { Typography } from '@mui/material'

export const NoMorePosts = styled(Typography)(() => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	padding: 0,
	marginBottom: '16px',
}))

export const postModal = {
	position: 'absolute',
	top: '52%',
	left: '50%',
	width: { xs: '100vw', sm: 600, md: 800 },
	transform: 'translate(-50%, -50%)',
	height: { xs: '93vh' },
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,

	p: 4,
	overflowY: 'auto',
}
