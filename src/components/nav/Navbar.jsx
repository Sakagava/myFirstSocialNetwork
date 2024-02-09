import './Navbar.css'
import { setPage } from '../../store/navigation'
import { useDispatch } from 'react-redux'

function Navbar() {
	const dispatch = useDispatch()
	return (
		<div className='nav'>
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
		</div>
	)
}

export default Navbar
