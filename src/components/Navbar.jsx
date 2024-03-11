import { useSelector, useDispatch } from 'react-redux'
import {
	NavWpar,
	ButtonWrap,
	NavButton,
	NavButtonLogOut,
	AccountButtonWrap,
} from '../styles/Nav'
import { Link, Outlet } from 'react-router-dom'
import { logOut } from '../store/users'

function Navbar() {
	const authUser = useSelector(state => state.users.authUser)
	const dispatch = useDispatch()
	const handleLogOut = () => {
		dispatch(logOut())
	}

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
				{!authUser.name && (
					<AccountButtonWrap>
						<Link to={`/registration`}>
							<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
								REGISTER
							</NavButton>
						</Link>
						<Link to={`/login`}>
							<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
								LOGIN
							</NavButton>
						</Link>
					</AccountButtonWrap>
				)}
				{authUser.name && (
					<AccountButtonWrap>
						<Link to={`/users/user/${authUser.id}`}>
							<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
								YOUR ACCOUNT
							</NavButton>
						</Link>
						<NavButtonLogOut
							variant='outlined'
							color='error'
							onClick={handleLogOut}
						>
							LOG OUT
						</NavButtonLogOut>
					</AccountButtonWrap>
				)}
			</NavWpar>
			<div id='detail'>
				<Outlet />
			</div>
		</>
	)
}

export default Navbar
