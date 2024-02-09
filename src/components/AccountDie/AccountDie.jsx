import './AccountDie.css'
import { setPage } from '../../store/navigation'
import { setCurrentUser } from '../../store/users'
import { useDispatch } from 'react-redux'

export default function Die({ className, user }) {
	const dispatch = useDispatch()
	return (
		<div className={className}>
			<span>
				<b
					onClick={e => {
						dispatch(setPage('Account'))
						dispatch(setCurrentUser(e.target))
					}}
				>
					{user?.username}
				</b>
			</span>
			<span>
				<p
					onClick={e => {
						dispatch(setPage('Account'))
						dispatch(setCurrentUser(e.target))
					}}
				>
					{user?.name}
				</p>
			</span>
		</div>
	)
}
