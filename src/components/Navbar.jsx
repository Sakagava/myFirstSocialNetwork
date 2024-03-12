import { useSelector, useDispatch } from 'react-redux'
import { Hidden } from '@mui/material'
import { useMediaQuery } from '@mui/material'
import {
	NavWpar,
	ButtonWrap,
	NavButton,
	NavButtonLogOut,
	AccountButtonWrap,
} from '../styles/Nav'
import { Link, Outlet } from 'react-router-dom'
import { logOut } from '../store/users'
import AccountMenu from './AccountMenu'

function Navbar() {
	const authUser = useSelector(state => state.users.authUser)
	const dispatch = useDispatch()
	const handleLogOut = () => {
		dispatch(logOut())
	}

	const isMobileScreen = useMediaQuery('(max-width:624px)')

	return (
		<>
			{isMobileScreen ? (
				<AccountMenu authUser={authUser} handleLogOut={handleLogOut} />
			) : (
				<NavWpar>
					<ButtonWrap>
						<Link to={'/myFirstSocialNetwork'}>
							<NavButton>Home</NavButton>
						</Link>
						<Link to={'/myFirstSocialNetwork/posts'}>
							<NavButton>Posts</NavButton>
						</Link>
						<Link to={'/myFirstSocialNetwork/users'}>
							<NavButton>Accounts</NavButton>
						</Link>
						<Link to={'/myFirstSocialNetwork/about'}>
							<NavButton>About Us</NavButton>
						</Link>
					</ButtonWrap>
					{!authUser.name && (
						<AccountButtonWrap>
							<Link to={`/myFirstSocialNetwork/registration`}>
								<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
									REGISTER
								</NavButton>
							</Link>
							<Link to={`/myFirstSocialNetwork/login`}>
								<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
									LOGIN
								</NavButton>
							</Link>
						</AccountButtonWrap>
					)}
					{authUser.name && (
						<AccountButtonWrap>
							<Link to={`/myFirstSocialNetwork/users/user/${authUser.id}`}>
								<NavButton variant='outlined' sx={{ marginRight: '10px' }}>
									PROFILE
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
			)}

			<div id='detail'>
				<Outlet />
			</div>
		</>
	)
}

export default Navbar
