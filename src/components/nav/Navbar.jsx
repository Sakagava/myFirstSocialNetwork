import { setPage } from '../../store/navigation'
import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'

function Navbar() {
	const dispatch = useDispatch()
	return (
		<Box
			sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					height: '60px',
					width: '60%',
				}}
			>
				<Button
					sx={{ minWidth: 100, cursor: 'pointer' }}
					onClick={() => dispatch(setPage('Home'))}
				>
					Home
				</Button>
				<Button
					sx={{ minWidth: 100, cursor: 'pointer' }}
					onClick={() => dispatch(setPage('Posts'))}
				>
					Posts
				</Button>
				<Button
					sx={{ minWidth: 100, cursor: 'pointer' }}
					onClick={() => dispatch(setPage('AllAccounts'))}
				>
					Accounts
				</Button>
				<Button
					sx={{ minWidth: 100, cursor: 'pointer' }}
					onClick={() => dispatch(setPage('AboutUs'))}
				>
					About
				</Button>
				{/* <Tooltip title='Account settings'>
					<IconButton
						// onClick={handleClick}
						size='small'
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup='true'
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
					</IconButton>
				</Tooltip> */}
			</Box>
		</Box>
	)
}

{
	/* <div className='nav'>
			<div className='nav_elem' onClick={() => dispatch(setPage('Home'))}>
				<div className='nav_elem_topBorder'></div>
				<p>Home</p>
				<div className='nav_elem_bottomBorder'></div>
			</div>
			<div className='nav_elem' onClick={() => dispatch(setPage('Posts'))}>
				<div className='nav_elem_topBorder'></div>
				<p>Posts</p>
				<div className='nav_elem_bottomBorder'></div>
			</div>
			<div
				className='nav_elem'
				onClick={() => dispatch(setPage('AllAccounts'))}
			>
				<div className='nav_elem_topBorder'></div>
				<p>Accounts</p>
				<div className='nav_elem_bottomBorder'></div>
			</div>
			<div className='nav_elem' onClick={() => dispatch(setPage('AboutUs'))}>
				<div className='nav_elem_topBorder'></div>
				<p>About</p>
				<div className='nav_elem_bottomBorder'></div>
			</div>
		</div> */
}

export default Navbar
