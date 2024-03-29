import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import Logout from '@mui/icons-material/Logout'
import { NavButton } from '../styles/Nav'
import { Link } from 'react-router-dom'
import { TUser } from '../types/TUsers'

type AccountMenuProps = {
	authUser: TUser
	handleLogOut: () => void
}

const AccountMenu: React.FC<AccountMenuProps> = ({
	authUser,
	handleLogOut,
}) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					textAlign: 'center',
					justifyContent: 'space-around',
					position: 'sticky',
					top: '0',
					zIndex: '10',
					bgcolor: 'white',
				}}
			>
				<Link to='/'>
					<NavButton sx={{ fontSize: { xs: '10px', sm: '15px' } }}>
						Home
					</NavButton>
				</Link>

				<Link to='/posts'>
					<NavButton sx={{ fontSize: { xs: '10px', sm: '15px' } }}>
						Posts
					</NavButton>
				</Link>
				<Link to='/users'>
					<NavButton sx={{ fontSize: { xs: '10px', sm: '15px' } }}>
						Accounts
					</NavButton>
				</Link>
				<Link to='/about'>
					<NavButton sx={{ fontSize: { xs: '10px', sm: '15px' } }}>
						About Us
					</NavButton>
				</Link>

				<Tooltip title='Account settings'>
					<IconButton
						onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar
							sx={{
								width: { xs: 25, sm: 38 },
								height: { xs: 25, sm: 38 },
								fontSize: { xs: '13px', sm: '20px' },
							}}
						>
							{Boolean(authUser.name) ? authUser.username[0] : 'M'}
						</Avatar>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id='account-menu'
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&::before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{Boolean(authUser.name) ? (
					<MenuItem component={Link} to={`/users/user/${authUser.id}`}>
						<Avatar>{authUser.username[0]}</Avatar> Profile
					</MenuItem>
				) : (
					<MenuItem component={Link} to='/login'>
						<Typography>Login</Typography>
					</MenuItem>
				)}

				<Divider />
				{Boolean(authUser.username) ? (
					<MenuItem onClick={handleLogOut}>
						<Logout fontSize='small' />
						Logout
					</MenuItem>
				) : (
					<MenuItem component={Link} to='/registration'>
						<Typography>Register</Typography>
					</MenuItem>
				)}
			</Menu>
		</>
	)
}

export default AccountMenu
