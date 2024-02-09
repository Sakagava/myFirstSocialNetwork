import './ChangeInput.css'
import { sortUsers } from '../../store/users'
import { useDispatch, useSelector } from 'react-redux'

function ChangeInput() {
	const dispatch = useDispatch()
	const sortBy = useSelector(state => state.users.sortBy)
	return (
		<div className='changeInput'>
			<form action=''>
				<label htmlFor=''>Sort by: </label>
				<select
					name=''
					id=''
					onChange={e => dispatch(sortUsers(e.target.value))}
				>
					<option value='name' selected={sortBy == 'name' && true}>
						Name
					</option>
					<option value='userName' selected={sortBy == 'userName' && true}>
						User Name
					</option>
				</select>
			</form>
		</div>
	)
}

export default ChangeInput
