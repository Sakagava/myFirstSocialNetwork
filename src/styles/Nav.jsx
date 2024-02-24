import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import styled from '@emotion/styled'

export const NavWpar = styled(Box)(() => ({
	display: 'flex',
	position: 'sticky',
	top: '0px',
	justifyContent: 'center',
	marginBottom: '30px',
	backgroundColor: 'white',
	paddingTop: '10px',
	zIndex: '20',
}))

export const ButtonWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'space-between',
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
