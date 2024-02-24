import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ErrorPage from './pages/ErrorPage.jsx'
import Content from './pages/Content.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'
import PageAllAccounts from './pages/PageAllAccounts.jsx'
import AboutUs from './pages/AboutUs.jsx'
import PageAccount from './pages/PageAccount.jsx'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navbar />,
		errorElement: <ErrorPage />,
		children: [
			{
				errorElement: <ErrorPage />,
				children: [
					{ index: true, element: <Home /> },
					{
						path: 'posts',
						element: <Content />,
					},
					{
						path: 'users',
						element: <PageAllAccounts />,
					},
					{
						path: 'about',
						element: <AboutUs />,
					},
					{
						path: 'users/user/:id',
						element: <PageAccount />,
					},
				],
			},
		],
	},
])

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
)
