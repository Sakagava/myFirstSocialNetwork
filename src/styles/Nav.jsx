import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import styled from '@emotion/styled'

export const NavWpar = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'center',
	marginBottom: '30px',
}))

export const ButtonWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	paddingTop: '20px',
	width: '60%',
}))

export const NavButton = styled(Button)(() => ({
	minWidth: 100,
	cursor: 'pointer',
	color: 'black',
	':hover': {
		backgroundColor: '#eeeeee',
	},
}))
