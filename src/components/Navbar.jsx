import { setPage } from '../store/navigation'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import styled from '@emotion/styled'

function Navbar() {
	const dispatch = useDispatch()

	const NavWpar = styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'center',
		marginBottom: '30px',
	}))

	const ButtonWrap = styled(Box)(() => ({
		display: 'flex',
		justifyContent: 'space-between',
		paddingTop: '20px',
		width: '60%',
	}))

	const NavButton = styled(Button)(() => ({
		minWidth: 100,
		cursor: 'pointer',
		color: 'black',
		':hover': {
			backgroundColor: '#eeeeee',
		},
	}))

	return (
		<NavWpar>
			<ButtonWrap>
				<NavButton onClick={() => dispatch(setPage('Home'))}>Home</NavButton>
				<NavButton onClick={() => dispatch(setPage('Posts'))}>Posts</NavButton>
				<NavButton onClick={() => dispatch(setPage('AllAccounts'))}>
					Accounts
				</NavButton>
				<NavButton onClick={() => dispatch(setPage('AboutUs'))}>
					About
				</NavButton>
			</ButtonWrap>
		</NavWpar>
	)
}

export default Navbar
