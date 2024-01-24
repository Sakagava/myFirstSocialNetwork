import './ContentBlock.css'
import AccountDie from '../accounts/AccountDie'

export default function ContentBlock({ users, post, handleClickAccount }) {
  const user = users.find(user => user.id === post.userId);

  if (!user) {
    return null;
  }

  return (
    <div className='content_block' key={post.id}>
      <h1>{post.title[0].toUpperCase() + post.title.slice(1)}</h1>
      <p>{post.body[0].toUpperCase() + post.body.slice(1)}</p>
      <div className='content_block_author' id={user.id} onClick={handleClickAccount}>
        <img
          src={`/src/assets/usersPhoto/photo${post.userId}.jpeg`}
          alt={`User ${post.userId}`}
        />
        <AccountDie 
          className = 'content_block_author_name'
          user = {user}
        />
      </div>
    </div>
  );
}