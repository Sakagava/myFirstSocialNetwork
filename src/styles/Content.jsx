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
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '50%',
	height: '90vh',
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
	overflowY: 'auto',
}
