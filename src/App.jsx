import './App.css'
import Content from './pages/Content.jsx'
import Navbar from './components/Navbar.jsx'
import { useEffect } from 'react'
import PageAccount from './pages/PageAccount.jsx'
import PageAllAccounts from './pages/PageAllAccounts.jsx'
import Home from './pages/PageHome.jsx'
import AboutUs from './pages/AboutUs.jsx'
import { addCommentsInPosts, fetchPosts } from './store/posts'
import { fetchUsers } from './store/users.js'
import { useDispatch, useSelector } from 'react-redux'
import { addLikeToComment } from './store/posts'

function App() {
	const page = useSelector(state => state.navigation.currentPage)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchUsers())
		dispatch(addCommentsInPosts())
	}, [dispatch])

	useEffect(() => {
		window.scrollTo({ top: 0 })
	}, [page])

	return (
		<Layout>
			{page === 'Home' && (
				<Home handleClickPosts={() => handleClickPage('Posts')} />
			)}
			{page === 'Posts' && <Content />}
			{page === 'Account' && <PageAccount />}
			{page === 'AllAccounts' && <PageAllAccounts />}
			{page === 'AboutUs' && <AboutUs />}
		</Layout>
	)
}

function Layout({ children }) {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}

export default App
