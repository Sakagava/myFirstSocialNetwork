import './ContentBlock.css'
import AccountDie from '/Разработка/Коды/React/firstAssinc/firstAssync/src/components/AccountDie/AccountDie'
import { useSelector } from 'react-redux'
export default function ContentBlock({ post, handleClickAccount }) {
	const users = useSelector(state => state.users.users)
	const user = users.find(user => user.id === post.userId)

	if (!user) {
		return null
	}

	return (
		<div className='content_block' key={post.id}>
			<h2>{post.title[0].toUpperCase() + post.title.slice(1)}</h2>
			<p>{post.body[0].toUpperCase() + post.body.slice(1)}</p>
			<div className='content_block_author' id={user.id}>
				<img
					src={`/src/assets/usersPhoto/photo${post.userId}.jpeg`}
					alt={`User ${post.userId}`}
					onClick={handleClickAccount}
				/>
				<AccountDie className='content_block_author_name' user={user} />
			</div>
		</div>
	)
}
