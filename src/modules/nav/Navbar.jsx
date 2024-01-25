import './Navbar.css'

function Navbar({handleClickHome, handleClickPosts, handleClickAccounts, handleClickAboutUs}) {
    return (
        <div className='nav'>
        <div className='nav_elem' onClick={handleClickHome}>
            <div className='nav_elem_topBorder'></div>
            <p>Home</p>
            <div className='nav_elem_bottomBorder'></div>
        </div>
        <div className='nav_elem' onClick={handleClickPosts}>
            <div className='nav_elem_topBorder'></div>
            <p>Posts</p>
            <div className='nav_elem_bottomBorder'></div>
        </div>
        <div className='nav_elem' onClick={handleClickAccounts}>
            <div className='nav_elem_topBorder'></div>
            <p>Accounts</p>
            <div className='nav_elem_bottomBorder'></div>
        </div>
        <div className='nav_elem' onClick={handleClickAboutUs}>
            <div className='nav_elem_topBorder'></div>
            <p>About</p>
            <div className='nav_elem_bottomBorder'></div>
        </div>
        </div>
    )
}

export default Navbar