import './PostsUser.css'

function PostsUser({user, handleClick, isActive, children}) {

    return (
        <>
            <div className={isActive ? "modalPostsUser_active" : "modalPostsUser_disabled"} onClick={handleClick} key = {user.id}>
                {children}
            </div>
            <div className={isActive ? "modalPostsUser_blurBack_active" : "modalPostsUser_blurBack_disabled"} onClick={handleClick}></div>
        </>
    )
}

export default PostsUser