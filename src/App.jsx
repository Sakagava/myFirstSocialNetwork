import './App.css'
import Content from './pages/Posts/Content'
import Navbar from './components/Nav/Navbar'
import { useEffect } from 'react'
import PageAccount from './pages/Account/PageAccount'
import PageAllAccounts from './pages/AllAccounts/PageAllAccounts'
import Home from './pages/Home/PageHome'
import AboutUs from './pages/About/AboutUs'
import { fetchPosts } from './store/posts'
import { fetchUsers } from './store/users.js'
import { useDispatch, useSelector } from 'react-redux'

function App() {
	const page = useSelector(state => state.navigation.currentPage)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchPosts())
		dispatch(fetchUsers())
	}, [dispatch])

	useEffect(() => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
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
