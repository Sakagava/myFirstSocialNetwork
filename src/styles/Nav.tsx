import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import styled from '@emotion/styled'

export const NavWpar = styled(Box)(() => ({
	display: 'flex',
	position: 'sticky',
	top: '0px',
	justifyContent: 'left',
	marginBottom: '30px',
	backgroundColor: 'white',
	paddingTop: '10px',
	paddingLeft: '20px',
	zIndex: '20',
}))

export const ButtonWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'left',
	width: '60%',
}))

export const AccountButtonWrap = styled(Box)(() => ({
	display: 'flex',
	justifyContent: 'right',
	width: '60%',
	paddingRight: '20px',
}))

export const NavButton = styled(Button)(() => ({
	minWidth: 30,
	cursor: 'pointer',
	color: 'black',
	':hover': {
		backgroundColor: '#eeeeee',
	},
}))

export const NavButtonLogOut = styled(Button)(() => ({
	minWidth: 100,
	cursor: 'pointer',
	color: 'black',
}))
