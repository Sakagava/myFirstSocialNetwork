import './Home.css'

function Home({handleClickPosts}) {
    return (
        <div className='home'>
            <div className='home_description'>
                <h1>Join a friendly community</h1>
                <p>Express your ideas in posts and read the ideas of other people from all over the planet</p>
            </div>
            <div className='home_buttons'>
                <button className='home_buttons_read' onClick={handleClickPosts}>Read posts</button>
                <button className='home_buttons_create'>Create posts</button>
            </div>
        </div>
    )
}

export default Home