import { useDispatch, useSelector } from 'react-redux'
import './PageAllAccounts.css'
import ChangeInput from '/Разработка/Коды/React/firstAssinc/firstAssync/src/components/inputs/ChangeInput'
import { setPage } from '../../store/navigation'
import { setCurrentUser } from '../../store/users'

function PageAllAccounts() {
	const users = useSelector(state => state.users.users)
	const dispatch = useDispatch()
	return (
		<div className='accounts'>
			<ChangeInput />
			{users.map(user => {
				return (
					<div
						className='accounts_account'
						key={user.id}
						id={user.id}
						onClick={e => {
							dispatch(setPage('Account'))
							dispatch(setCurrentUser(e.target))
						}}
					>
						<div className='accounts_account_img'>
							<img src={`/src/assets/usersPhoto/photo${user.id}.jpeg`} alt='' />
						</div>
						<span className='accounts_account_username'>
							<h1>{user.username}</h1>
						</span>
						<span className='accounts_account_name'>
							<h3>{user.name}</h3>
						</span>
					</div>
				)
			})}
		</div>
	)
}

export default PageAllAccounts
