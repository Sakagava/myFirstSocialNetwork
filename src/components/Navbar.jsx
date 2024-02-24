import { NavWpar, ButtonWrap, NavButton } from '../styles/Nav'
import { Link, Outlet } from 'react-router-dom'

function Navbar() {
	return (
		<>
			<NavWpar>
				<ButtonWrap>
					<Link to={'/'}>
						<NavButton>Home</NavButton>
					</Link>

					<Link to={'/posts'}>
						<NavButton>Posts</NavButton>
					</Link>
					<Link to={'/users'}>
						<NavButton>Accounts</NavButton>
					</Link>
					<Link to={'/about'}>
						<NavButton>About Us</NavButton>
					</Link>
				</ButtonWrap>
			</NavWpar>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	)
}

export default Navbar
