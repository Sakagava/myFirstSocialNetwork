import './ContentBlock.css'
import ContentBlock from './ContentBlock'

export default function Content({posts, users, numberOfPosts, handleClickShowMore, handleClickAccount}) {
  
    return (
      <div className='content'>
      {posts.slice(0, numberOfPosts).map(post => {
        return (
          <ContentBlock 
            users = {users}
            post = {post}
            key = {post.id}
            handleClickAccount = {handleClickAccount}
          />
        )
      })}
      {posts.length > 0 && 
        <div className='content_lastElem'> 
          {numberOfPosts < posts.length ?  
              <span onClick={handleClickShowMore}>Show more</span> :
              <p>No more posts</p>
          }
        </div>
      }
    </div>
    )
  }