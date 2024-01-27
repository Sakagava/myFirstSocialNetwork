import { useState } from 'react'
import './ContentBlock.css'
import ContentBlock from './ContentBlock'

export default function Content({posts, users, numberOfPosts, handleClickShowMore, handleClickAccount}) {
    const [isActive, setIsActive] = useState(false)
    function handleBlur(e) {
        if (e.target.className == 'modalPostsUser_blurBack_active' || e.target.className == 'account_info_numberOfPosts') {
            e.stopPropagation()
            setIsActive(!isActive)
        }
    }

    return (
      <>
        <div className='heading'>
          <h1>All posts</h1>
        </div>
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
      </div>
        {posts.length > 0 && 
          <div className='content_lastElem'> 
            {numberOfPosts < posts.length ?  
                <span onClick={handleClickShowMore}>Show more</span> :
                <p>No more posts</p>
            }
          </div>
        }
      </>
    )
  }