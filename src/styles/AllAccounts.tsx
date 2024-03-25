import styled from '@emotion/styled'
import { Box, Paper } from '@mui/material'

export const InputWrap = styled(Box)(() => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	width: '100%',
	marginBottom: '20px',
}))

export const UserCard = styled(Paper)(() => ({
	height: 135,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	marginBottom: '10px',
	cursor: 'pointer',
	transition: '0.2s',
	':hover': {
		backgroundColor: '#eeeeee',
	},
}))
