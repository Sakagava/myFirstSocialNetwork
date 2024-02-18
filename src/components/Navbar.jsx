import { setPage } from '../store/navigation'
import { useDispatch } from 'react-redux'
import { NavWpar, ButtonWrap, NavButton } from '../styles/Nav'

function Navbar() {
	const dispatch = useDispatch()

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
