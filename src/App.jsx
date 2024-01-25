import './App.css'
import Content from './modules/posts/Content'
import Navbar from './modules/nav/Navbar'
import {useState, useEffect} from 'react'
import PageAccount from './modules/accounts/PageAccount/PageAccount'
import PageAllAccounts from './modules/accounts/PageAllAccounts/PageAllAccounts'
import Home from './modules/Home/Home'
import AboutUs from './modules/accounts/About/AboutUs'

function App() {
  const [page, setPage] = useState('Home')
  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null) 
  const [numberOfPosts, setNumberOfPosts] = useState(8)

  useEffect(() => {
    (async function getPosts() {
      const posts = await fetch('https://jsonplaceholder.typicode.com/posts')
      const finalPosts = await posts.json()
      setPosts(finalPosts.sort(() => Math.random() - 0.5))
    })();

    (async function getUsers() {
      const users = await fetch('https://jsonplaceholder.typicode.com/users')
      const finallyUsers = await users.json()
      setUsers(finallyUsers.sort((user, nextUser) => {
        if (user.name < nextUser.name)
          return -1;
        if ( user.name > nextUser.name)
          return 1;
        return 0;
      }))
    })();
  },[])

  function handleClickShowMore() {
    setNumberOfPosts(numberOfPosts + 8)
  }

  function handleClickAccount(e) {
    const userId = Number((e.target.closest('.content_block_author') || e.target.closest('.accounts_account')).id)
    setPage('Account')
    setCurrentUser(users.find(user => user.id === userId));
  }

  function handleClickPage(page) {
    setPage(page)
  }

  function handleChange(e) {
    switch (e.target.value) {
      case 'name': 
        setUsers([...users.sort((user, nextUser) => {
          if (user.name < nextUser.name)
            return -1;
          if ( user.name > nextUser.name)
            return 1;
          return 0;
        })])
        break
      
      case 'userName':
        setUsers([...users.sort((user, nextUser) => {
          if (user.username < nextUser.username)
            return -1;
          if ( user.username > nextUser.username)
            return 1;
          return 0;
        })])
        break
    }
  }

  switch (page) {
    case 'Home': 
      return (
        <>
          <Navbar 
            handleClickHome = {e => handleClickPage('Home')}
            handleClickPosts = {e => handleClickPage('Posts')}
            handleClickAccounts = {e => handleClickPage('AllAccounts')}
            handleClickAboutUs = {e => handleClickPage('AboutUs')}
          />
          <Home 
            handleClickPosts = {e => handleClickPage('Posts')}
          />
        </>
      )

    case 'Posts':
      return (
        <>
          <Navbar 
            handleClickHome = {e => handleClickPage('Home')}
            handleClickPosts = {e => handleClickPage('Posts')}
            handleClickAccounts = {e => handleClickPage('AllAccounts')}
            handleClickAboutUs = {e => handleClickPage('AboutUs')}
          />
          <div className='heading'>
            <h1>All posts</h1>
          </div>
          <Content 
            posts = {posts}
            users = {users}
            numberOfPosts = {numberOfPosts}
            handleClickShowMore = {handleClickShowMore}
            handleClickAccount = {handleClickAccount}
          />
        </>
      )
    
    case 'Account': 
      return (
        <>
          <Navbar 
            handleClickHome = {e => handleClickPage('Home')}
            handleClickPosts = {e => handleClickPage('Posts')}
            handleClickAccounts = {e => handleClickPage('AllAccounts')}
            handleClickAboutUs = {e => handleClickPage('AboutUs')}
          />
          <PageAccount 
            user = {currentUser}
          />
        </>
      )
    
      case 'AllAccounts':
        return (
          <>
            <Navbar 
              handleClickHome = {e => handleClickPage('Home')}
              handleClickPosts = {e => handleClickPage('Posts')}
              handleClickAccounts = {e => handleClickPage('AllAccounts')}
              handleClickAboutUs = {e => handleClickPage('AboutUs')}
            />
            <PageAllAccounts
              users = {users}
              handleClickAccount = {handleClickAccount}
              handleChange = {handleChange}
            />
          </>
        )
      
      case 'AboutUs': 
          return (
            <>
              <Navbar 
                handleClickHome = {e => handleClickPage('Home')}
                handleClickPosts = {e => handleClickPage('Posts')}
                handleClickAccounts = {e => handleClickPage('AllAccounts')}
                handleClickAboutUs = {e => handleClickPage('AboutUs')}
              />
              <AboutUs />
            </>
          )
  }
}

export default App
